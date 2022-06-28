import BpmnModeler from "bpmn-js/lib/Modeler";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-font/dist/css/bpmn-embedded.css";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
import camundaModdleDescriptor from "camunda-bpmn-moddle/resources/camunda";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import "./bpmn.css";
import { useEffect } from "react";

const emptyBpmn = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd"><bpmn2:process id="Process_191t89p" /><bpmndi:BPMNDiagram id="BPMNDiagram_1"><bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_191t89p" /></bpmndi:BPMNDiagram></bpmn2:definitions>`;

let modeler = null;

function Bpmn2() {
  useEffect(() => {
    modeler = new BpmnModeler({
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

    newBpmnDiagram();
  });

  const newBpmnDiagram = () => {
    openBpmnDiagram(localStorage.getItem("sen") || emptyBpmn);
  };

  const openBpmnDiagram = (xml) => {
    modeler.importXML(xml, (error) => {
      if (error) {
        return console.log("fail import xml");
      }

      var canvas = this.modeler.get("canvas");

      canvas.zoom("fit-viewport");
    });
  };

  const saveBpmnDiagram = () => {
    modeler.saveXML().then((xml) => localStorage.setItem("sen", xml.xml));
  };

  return (
    <>
      <div id="bpmncontainer">
        <div
          id="propview"
          style={{
            width: "25%",
            height: "95vh",
            float: "right",
            overflowX: "auto",
          }}
        ></div>
        <div
          id="bpmnview"
          style={{ width: "75%", height: "98vh", float: "left" }}
        ></div>
      </div>
      <button
        style={{
          position: "fixed",
          bottom: "10px",
          left: "10px",
        }}
        onClick={saveBpmnDiagram}
      >
        Save
      </button>
    </>
  );
}

export default Bpmn2;
