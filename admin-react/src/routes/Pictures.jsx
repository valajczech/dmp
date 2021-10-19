import React from "react";
import "../style/routes/Pictures.css";
import PictureListItem from "../components/PictureListItem";
import { FaHeart } from "react-icons/fa";

class Pictures extends React.Component {
  render() {
    return (
      <div className="pictures">
        <h3>Všechny fotografie</h3>
        <table id="pictures-table">
          <thead>
            <tr id="table-head">
              <th>Název</th>
              <th id="size">Velikost</th>
              <th id="likes">Počet Lajků</th>
              <th id="date">Naposledy modifikováno</th>
            </tr>
          </thead>
          <tbody>
            <PictureListItem
              name="NejakeDummyFotkyBru"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage4.jpg?alt=media&token=9d766a79-f85d-483c-9d1e-80d105f86344"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="Dummy"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage5.jpg?alt=media&token=014fc93c-cdd0-4174-aeb4-248a283f8892"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="NejakeDummyFotkyBru"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage4.jpg?alt=media&token=9d766a79-f85d-483c-9d1e-80d105f86344"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="Dummy"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage5.jpg?alt=media&token=014fc93c-cdd0-4174-aeb4-248a283f8892"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="NejakeDummyFotkyBru"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage4.jpg?alt=media&token=9d766a79-f85d-483c-9d1e-80d105f86344"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="Dummy"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage5.jpg?alt=media&token=014fc93c-cdd0-4174-aeb4-248a283f8892"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="NejakeDummyFotkyBru"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage4.jpg?alt=media&token=9d766a79-f85d-483c-9d1e-80d105f86344"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="Dummy"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage5.jpg?alt=media&token=014fc93c-cdd0-4174-aeb4-248a283f8892"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="NejakeDummyFotkyBru"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage4.jpg?alt=media&token=9d766a79-f85d-483c-9d1e-80d105f86344"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="Dummy"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage5.jpg?alt=media&token=014fc93c-cdd0-4174-aeb4-248a283f8892"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="NejakeDummyFotkyBru"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage4.jpg?alt=media&token=9d766a79-f85d-483c-9d1e-80d105f86344"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="Dummy"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage5.jpg?alt=media&token=014fc93c-cdd0-4174-aeb4-248a283f8892"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="NejakeDummyFotkyBru"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage4.jpg?alt=media&token=9d766a79-f85d-483c-9d1e-80d105f86344"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="Dummy"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage5.jpg?alt=media&token=014fc93c-cdd0-4174-aeb4-248a283f8892"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="NejakeDummyFotkyBru"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage4.jpg?alt=media&token=9d766a79-f85d-483c-9d1e-80d105f86344"
              lastModified="15.2.2021"
            />
            <PictureListItem
              name="Dummy"
              size="5.65MB"
              likes="23"
              src="https://firebasestorage.googleapis.com/v0/b/dmp-bures.appspot.com/o/BuresTestImage5.jpg?alt=media&token=014fc93c-cdd0-4174-aeb4-248a283f8892"
              lastModified="15.2.2021"
            />

          </tbody>
        </table>
      </div>
    );
  }
}

export default Pictures;
