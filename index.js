window.onload = function () {
    "use strict";

    d3.text("facebook-sample-data.txt", function (text) {
        var data,
            nll,
            nodeTable,
            adapter,
            graph,
            cmap,
            view,
            oldNodeEnter;

        console.log("Loading data...");
        data = d3.tsv.parseRows(text, function (row) {
            return [Number(row[0]), Number(row[1])];
        });
        console.log("done");

        // Construct a node link list.
        nll = {
            nodes: [],
            links: []
        };

        nodeTable = {};
        console.log("building graph data...");
        _.each(data, function (row) {
            _.each(row, function (node) {
                if (!_.has(nodeTable, node)) {
                    nodeTable[node] = _.size(nll.nodes);
                    nll.nodes.push({
                        id: node
                    });
                }
            });

            nll.links.push({
                source: nodeTable[row[0]],
                target: nodeTable[row[1]],
                undirected: true,
                data: {}
            });
        });
        console.log("done");

        // Create a graph data adapter from the node link data.
        adapter = new clique.adapter.NodeLinkList(nll);

        // Create a graph model useing the adapter.
        window.graph = graph = new clique.Graph({
            adapter: adapter
        });

        // Create a view to visualize the graph.
        cmap = d3.scale.category10();
        window.view = view = new clique.view.Cola({
            model: graph,
            el: "#graph",
            fill: function (d) {
                return cmap(_.last(d.key));
            }
        });

        view.selection.on("focused", function (focused) {
            if (!_.isUndefined(focused)) {
                console.log(focused);
            }
        });

        oldNodeEnter = view.nodeEnter;
        view.nodeEnter = _.bind(function (enter) {
            oldNodeEnter(enter);
            this.nodes.on("dblclick", function (d) {
                expandNode(d.key);
            });
        }, view);

        // Some functions to drive the visualization from the console.
        //
        // Add a node to the graph by id number.
        window.addNode = function (key) {
            adapter.findNodeByKey(key).then(function (node) {
                if (!node) {
                    console.warn("No such node with id " + key);
                    return;
                }

                return graph.addNode(node);
            });
        };

        // Expand a node already in the graph.
        window.expandNode = function (key) {
            if (!_.has(graph.nodes, key)) {
                console.warn("No such node with id " + key + " in graph");
                return;
            }

            return graph.addNeighborhood({
                center: graph.adapter.getAccessor(key),
                radius: 1
            });
        };

        window.addNode("node_1");
    });
};
