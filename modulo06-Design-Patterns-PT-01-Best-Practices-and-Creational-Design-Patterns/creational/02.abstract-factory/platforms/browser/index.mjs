import ViewFactory from "../../shared/base/viewFactory.mjs";
import TableBrowserComponent from "./table.mjs";

export default class BrowserFactory extends ViewFactory {
  createTable(data) {
    return new TableBrowserComponent();
  }
}