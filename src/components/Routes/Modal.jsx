import { useState } from "react";

export default function Modal(props) {
  const { choice } = props;
  const [btnClick, setBtnClick] = useState(false);

  return (
    <div id="myModal" class="modal fade">
      <div class="modal-dialog modal-confirm">
        <div class="modal-content">
          <div class="modal-header flex-column">
            <div class="icon-box">
              <i class="material-icons">&#xE5CD;</i>
            </div>
            <h4 class="modal-title w-100">Are you sure?</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <p>Do you really want to delete these records?</p>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => {
                setBtnClick(false);
                choice(btnClick);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-danger"
              onClick={() => {
                setBtnClick(true);
                choice(btnClick);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
