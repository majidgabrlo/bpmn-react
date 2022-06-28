import React, { Component } from "react";
import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-font/dist/css/bpmn-embedded.css";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import "./bpmn.css";

const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"><bpmn2:process id="Process_191t89p"><bpmn2:task id="Activity_0a37y68" name="Majid" /></bpmn2:process><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_191t89p"><bpmndi:BPMNShape id="Activity_0a37y68_di" bpmnElement="Activity_0a37y68"><dc:Bounds x="420" y="750" width="100" height="80" /></bpmndi:BPMNShape></bpmndi:BPMNPlane></bpmndi:BPMNDiagram></bpmn2:definitions>`;

class Bpmn extends Component {
  modeler = null;

  componentDidMount = () => {
    this.modeler = new BpmnModeler({
      container: "#bpmnview",
      keyboard: {
        bindTo: window,
      },
      propertiesPanel: {
        parent: "#propview",
      },
      additionalModules: [propertiesPanelModule, propertiesProviderModule],
      moddleExtensions: {
        camunda: camundaModdleDescriptor,
      },
    });

    this.newBpmnDiagram();
  };

  newBpmnDiagram = () => {
    this.openBpmnDiagram(localStorage.getItem("sen") || emptyBpmn);
  };

  openBpmnDiagram = (xml) => {
    this.modeler.importXML(xml, (error) => {
      if (error) {
        return console.log("fail import xml");
      }

      var canvas = this.modeler.get("canvas");

      canvas.zoom("fit-viewport");
    });
  };

  saveBpmnDiagram = () => {
    this.modeler.saveXML().then((xml) => localStorage.setItem("sen", xml.xml));
  };

  render = () => {
    return (
      <>
        <div id="bpmncontainer">
          <div
            id="propview"
            style={{
              width: "25%",
              height: "98vh",
              float: "right",
              maxHeight: "98vh",
              overflowX: "auto",
            }}
          ></div>
          <div
            id="bpmnview"
            style={{ width: "75%", height: "98vh", float: "left" }}
          ></div>
        </div>
        <button onClick={this.saveBpmnDiagram}>Save</button>
      </>
    );
  };
}

export default Bpmn;
