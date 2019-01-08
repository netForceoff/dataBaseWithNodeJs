function saveXMLFile(XMLSerial, xmlDocument) {
    let newXmlStr = XMLSerial.serializeToString(xmlDocument);
          
    fs.writeFile(fileName, newXmlStr, err => {
      if (err) throw err;
    });
  }