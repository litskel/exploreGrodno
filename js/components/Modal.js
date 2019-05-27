export const Modal = /* html */`
<div class="modal modal active">
  <a class="modal-overlay" aria-label="Close" data-modal="false" click="{{close}}"></a>
  <div class="modal-container">
    <div class="modal-header">
      <a class="btn btn-clear" style="float: right!important" aria-label=":close" data-modal="false" click="{{close}}"></a>
      <div class="modal-title h5" ui:if="title">{{title}}</div>
      <transclude key="header"/>
    </div>
    <div class="modal-body" style="max-height: 70vh;">
      <div class="content">
        <transclude/>
      </div>
    </div>
    <div class="modal-footer">
        <transclude key="footer"/>
    </div>
  </div>
</div>`
