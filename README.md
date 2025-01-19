# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

---

# CICD Pipeline - Funktionsweise

Die CICD-Pipeline in diesem Projekt ist mit github Actions konfiguriert. Die Pipeline wird ausgelöst, wenn Änderungen in beliebigen Branches, einschliesslich `master`, gepusht werden.
Die Pieline beinhaltet Codeüberprüfung, Testen, Bauen der Applikation und Deployment als Docker image in Docker hub. 

## Übersicht der Pipeline

### **1. Lint**
Lint überprüft den Code auf Einhaltung der definierten Codierstandards und Formatierung von ESLint. <br>
Ist dieser Schritt nicht erfolgreich, wird der Build Prozess nicht angestossen und entsprechende Fehlermeldungen angezeigt.


### **2. Test**
Die Tests stellen sicher, dass alle Komponententests (Jest) erfolgreich ausgeführt werden. <br>
Ist dieser Schritt nicht erfolgreich, wird der Build Prozess nicht angestossen und entsprechende Fehlermeldungen angezeigt.


### **3. Build**
Die Build-Phase erstellt die Anwendung, nachdem die Lint- und Test-Phasen erfolgreich abgeschlossen wurden.
- **Abhängigkeiten:** Test und Lint müssen erfolgreich abgeschlossen sein.

### **4. Deploy**
Der Deploy Job veröffentlicht die Anwendung als Docker-Image auf DockerHub.
- **Abhängigkeiten:** Build muss erfolgreich abgeschlossen sein.


---

## Besonderheiten der Pipeline

- **Parallele Ausführung:** Die Phasen `lint` und `test` laufen parallel, um die Laufzeit der Pipeline zu optimieren.
- **Caching:** Node.js-Abhängigkeiten werden zwischen den Builds zwischengespeichert, um die Installationszeit zu reduzieren.
- **Deployment:** Das fertige Docker-Image wird mit Unterstützung für Multi-Architektur-Builds erstellt und automatisch auf DockerHub hochgeladen.
- **Fehlende Integration:** Cypress-basierte End-to-End-Tests sind in der Pipeline kommentiert, da das Backend erforderlich wäre.
