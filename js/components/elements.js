
export class Select {
  TEMPLATE() {
    return /* html */ `
      <select class="form-select" change="{{change}}">
        <option selected="{{selected}}" value="" ui:if="!required">...</option>
        <option ui:each="option of options" selected="{{selected}}" value="{{option.id}}">{{optionName}}</option>
      </select>`
  }
  getSelected() {
    return this.option ? this.value === this.option.id : !this.value
  }
  getOptionName() {
    const option = this.option
    return option.name || option.id
  }
  getOptions() {
    if (this.options) {
      return this.options
    }
    this.options = [{ name: 'loading...' }]
    return this.options
  }
}

    <h5>{{caption}}</h5>
  </div>
  <div class="parallax-back">
    <img src="{{backImage}}" class="img-responsive rounded"/>
  </div>
</div>
</div>`

export const Tags = /* html */ `
  <div class="ui mini labels p-2">
      <span class="chip bg-success:{{tag.selected}}" data="{{tag}}" click="{{onItem}}" ui:each="tag of data">
      <span>{{tag.name}} <small>{{tag.count}}</small></span>
      </span>
  </div>`

export const Toast = /* html */`
  <div class="toast toast-primary" style="position:fixed; right:5rem; bottom:1rem; width: 20rem;">
    <button class="btn btn-clear float-right" click="->" data-touch="{{text}}"></button>
    <p>{{top.ts}}</p>
  </div>`

export const Tabs = /* html */`
  <ul class="tab tab-block">
    <li class="tab-item" ui:each="item of data">
      <a href="#tab?tab={{item.value}}">{{item.name}}</a>
    </li>
  </ul>`

export const Sidebar = /* html */`
  <div class="off-canvas off-canvas-sidebar-show">
    <a class="off-canvas-toggle btn btn-primary btn-action show-lg" href="#sidebar">
      <i class="icon icon-menu"/>
    </a>
    <div id="sidebar" class="off-canvas-sidebar" style="max-width:85%;">
      <ui:transclude key="aside"/>
    </div>
    <a class="off-canvas-overlay" href="#"></a>
    <div class="off-canvas-content">
      <ui:transclude key="content"/>
    </div>
  </div>
  `
