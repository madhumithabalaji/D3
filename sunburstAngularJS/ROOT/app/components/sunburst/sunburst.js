(function (angular) {
    'use strict';
    angular.module('app').component('simpleSunburst', {
        templateUrl: 'app/components/sunburst/sunburst.html',
        controller: sunburstComponent,
        bindings: {
            data: '=',
        }
    });
})(window.angular);

function sunburstComponent($scope) {
    var ctrl = this;
    ctrl.data.name = ""; //Initially empty
    ctrl.loadChart = function () {

        let width = ctrl.data.width;
        let height = ctrl.data.height;
        let radius = Math.min(width, height) / 2;

        //async request; AJAX Request can be made separtely too 
        d3.json(ctrl.data.url).then(function (json) {
            var color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, json.children.length + 1));

            // create and position SVG
            var g = d3.select('#chart')
                .append('svg:svg')
                .attr('width', width)
                .attr('height', height)
                .attr("id", "container")
                .append('svg:g')
                .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

            var partition = d3.partition().size([2 * Math.PI, radius]);

            var root = d3.hierarchy(json, function (d) { return d.children })
                .sum(function (d) {
                    if (d.children) {
                        return 0
                    } else {
                        return 1
                    }
                });

            partition(root);

            var arc = d3.arc()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
                .padRadius(radius / 2)
                .innerRadius(d => d.y0)
                .outerRadius(d => d.y1 - 1);

            g.selectAll('path')
                .data(root.descendants())
                .enter().append('path')
                .attr("display", function (d) { return d.depth ? null : "block"; })
                .attr("d", arc)
                .attr("fill-rule", "evenodd")
                .style('stroke', '#fff')
                .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); })
                .on("click", displayNodeName);

            d3.select("#container").on("mouseleave", mouseleave);
        });

        //Update data-bind span element
        function displayNodeName(event, element) {
            ctrl.data.name = element.data.name; //get comp name
        }

        //on ng-click 
        ctrl.displayCompName = function (obj) {
            d3.selectAll("path").style("opacity", 0.5);
        }

        // Restore everything when moving outside the visualization
        function mouseleave(d) {
            ctrl.data.name = "Mouse Pointer Outside";
            d3.selectAll("path").on("mouseover", null).style("opacity", 1); // Deactivate all segments
            d3.select("#disNamePlaceholder").transition().duration(1000);
        }
        //chart component end
    };



}
