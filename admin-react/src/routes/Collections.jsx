import React from "react";
import { FaPlus } from "react-icons/fa";
import CollectionItem from "../components/CollectionItem";
import { Storage } from "../helpers/storage";
import { Collections } from "../helpers/collections";
import emmiter from "../utils/EventEmitter";
import "../style/routes/Collections.css";

class CollectionsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isCollectionBeingAdded: false,
    };
  }
  componentDidMount() {
    this.setState({
      data: Storage.Collections.get(),
    });
    emmiter.addListener("CollectionDelete", () => {
      this.updateCollections();
    });
  }
  toggleNewColPopup = () => {
    this.setState({
      isCollectionBeingAdded: !this.state.isCollectionBeingAdded,
    });
  };
  updateCollections = async () => {
    Storage.Collections.clear();
    this.setState({ data: await Collections.Get.detailedCollectionList() });
    Storage.Collections.set(this.state.data);
  };
  addNewCollection = async (event) => {
    event.preventDefault();
    // Jesus christ
    const data = {
      collectionName: event.target.elements[0].value,
    };
    await Collections.createNew(data);
    this.updateCollections();
    this.toggleNewColPopup();
    // TODO: immediately show the new album, maybe using redirect or
    // TODO: some update function.
  };

  render() {
    return (
      <div className="collections">
        <div className="collections-control">
          <button id="newCollection" onClick={this.toggleNewColPopup}>
            <FaPlus />
            <span>Vytvořit novou kolekci</span>
          </button>
        </div>
        <div className="all">
          {this.state.data.map((item) => {
            return (
              <CollectionItem
                key={item.id || item.name}
                id={item.id}
                title={item.name}
                total={item.connectedImages.length}
              />
            );
          })}
        </div>
        <div
          className={
            this.state.isCollectionBeingAdded
              ? "new-collection"
              : "new-collection hidden"
          }
        >
          <div className="modal">
            <form onSubmit={this.addNewCollection}>
              <div className="input">
                <input type="text" id="collection-new-name" placeholder="Název nového alba"/>
              </div>
              <div className="controls">
                <button type="submit" id="submit_new" >Přidat</button>
                <button type="button" id="cancel_new" onClick={this.toggleNewColPopup}>
                  Zrušit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionsPage;
