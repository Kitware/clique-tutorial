window.onload = function () {
    "use strict";

    d3.text("facebook-links.txt", function (text) {
        var data,
            nll,
            nodeTable,
            adapter,
            graph,
            view;

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
                        data: {
                            id: node
                        }
                    });
                }
            });

            nll.links.push({
                source: nodeTable[row[0]],
                target: nodeTable[row[1]],
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
        view = new clique.view.Cola({
            model: graph,
            el: "#graph"
        });
    });
};
