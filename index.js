window.onload = function () {
    "use strict";

    d3.text("facebook-links.txt", function (text) {
        var data,
            nll,
            nodeTable;

        data = d3.tsv.parseRows(text, function (row, i) {
            return [Number(row[0]), Number(row[1])];
        });

        // Construct a node link list.
        nll = {
            nodes: [],
            links: []
        };

        nodeTable = {};
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

        console.log(nll);
    });
};
