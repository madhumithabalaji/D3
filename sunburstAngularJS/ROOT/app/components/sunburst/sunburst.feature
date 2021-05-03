Feature: Sunburst Chart

    Draw a Sunburst Chart of varying depth with a JSON Input

    Background: Environment Setup
    Have the Tomcat Environment Setup ready and test the working of localhost with specified port before starting to developed the code for Graph

    Scenario: Display Chart on Page Load
        Given localhost works
        When the url "http://localhost:8080/" is entered
        Then the Sunburst Chart should be displayed on the screen

    Scenario: Click on Chart
        Given Sunburst Chart is displayed
        When Mouse Pointer is placed on the Chart
        And Sunburst Chart is clicked
        Then Chart should become transparent
        And Value of the selected portion should be displayed

    Scenario: Mouse away from Chart
        Given Sunburst Chart is clicked
        When Mouse moves away from the Chart
        Then Chart becomes solid again

    Scenario Outline: Click on Different Layers
        Given Sunburst Chart is displayed
        When Sunburst Component belonging to <depth> is clicked
        Then Value corresponding to the component belonging to depth <depth> is displayed
            | depth |
            | 1     |
            | 2     |

    Scenario Outline: Display Chart for Different JSONs
        Given Different sets of Input are available
        When <json> JSON URL is given in app config file
        Then the Chart corresponding to <json> of length <len> with varying depth is displayed
            | json       | len |
            | sample set | 2   |
            | full set   | 21  |

    Scenario Outline: Display Chart for Different parameters
        Given Different
        When Param values height <height> and width <width> are changed in app config file
        Then Chart with height <height> and width <width> is displayed
            | height | width |
            | 750    | 600   |
            | 950    | 800   |