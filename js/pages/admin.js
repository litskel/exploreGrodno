
export const AdminApp = /* template */ `
<Sidebar>
<AsideAdmin ui:key="aside"/>
<AdminModule  ui:key="content"/>
</Sidebar>
`

export const AdminModule = /* template */ `
<div>     
<Hero title="Grodno Explorer - Admin console"/>
    <div class="container pt-1 bg-gray" style="max-width:940px;">
      <div class="columns">
        <div class="column col-12 col-sm-12">
          <RouteMap src="<- routeMapUrl"/>
        </div>
      </div>
    </div>

    <div class="container my-0 pt-0" style="max-width:940px;">
    <Tags data="<- filteredTags" onItem="-> toggleTag"/>
    <PlacesSelectorList data="<- filteredPlaces" sortBy="created_at"/>
  </div>
</div>`

export const AsideAdmin = /* html */`
  <div class="panel" style="height: 100%;">
  <div class="panel-header">
    <a class="btn btn-clear show-lg" style="float: right!important" href="#"></a>
    <div class="panel-title">
    <h1>A new route</h1>
    </div>
  </div>
  <div class="panel-nav">
  </div>
  <div class="panel-body">
  <SubmitForm places="<- selectedPlacesIds" photo="<- suggestedPhoto"/>
  </div>
  <div class="panel-footer">
  </div>
  </div>
  `
export const SubmitForm = /* html */`
<form class="form-horizontal" method="POST" target="submitted"
action="https://script.google.com/macros/s/AKfycbygqpzU57bxZAW48Mo8nFxodJmy9_WFwiG7XizFmxY/dev">
<div class="form-group">
  <div class="col-3 col-sm-12">
    <label class="form-label" for="title">Name</label>
  </div>
  <div class="col-9 col-sm-12">
    <input class="form-input" type="text" name="title" id="title" placeholder="name">
  </div>
</div>
<div class="form-group">
  <div class="col-3 col-sm-12">
    <label class="form-label" for="description">Description</label>
  </div>
  <div class="col-9 col-sm-12">
    <textarea class="form-input" name="description" id="description" placeholder="description"/>
  </div>
</div>
<div class="form-group">
  <div class="col-3 col-sm-12">
    <label class="form-label" for="link">Link</label>
  </div>
  <div class="col-9 col-sm-12">
    <input class="form-input" type="text" name="link" id="link" placeholder="URL address (optional)"/>
  </div>
</div>
<div class="form-group">
  <div class="col-3 col-sm-12">
    <label class="form-label" for="input-example-1">Places</label>
  </div>
</div>
<PlacesList2 data="<- selectedPlaces"/>

<div class="input-group">
  <input class="form-input" type="hidden" name="_format" value="html"/>
  <input class="form-input" type="hidden" name="sheet" value="routes"/>
  <input class="form-input" type="hidden" name="places" value="{{places}}"/>
  <input class="form-input" type="hidden" name="photo" value="{{photo}}"/>
  <button class="btn btn-primary input-group-btn">Submit</button>
</div>
<iframe name="submitted" width="100%" height="15" frameborder="0"></iframe>
</form>
`
export const PlacesList2 = /* template */ `
<div class="timeline">
  
  <div class="timeline-item" id="timeline-example-2" ui:each="item of data">
    <div class="timeline-left">
      <figure class="avatar avatar-sm bg-primary" data-initial="{{item.title|initials}}">
      <img src="{{item.photo}}" class="img-responsive"/>
      </figure>
    </div>
    <div class="timeline-content">
      <div class="tile">
        <div class="tile-content">
          <p class="tile-subtitle">{{item.title|subject}}</p>
        </div>
        <div class="tile-action">
          <div class="btn-group btn-group-block">
            <button class="btn disabled:{{itemIndex}}=0" data-id="{{item.id}}" data-dir="up" click="-> arrangePlace"><i class="icon icon-arrow-up"></i></button>
            <button class="btn disabled:{{itemIndex}}={{data.length}}" data-id="{{item.id}}" data-dir="down" click="-> arrangePlace"><i class="icon icon-arrow-down"></i></button>
            <button class="btn btn-primary" data-id="{{item.id}}" click="-> togglePlace"><i class="icon icon-cross"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div> 
</div>`

export const PlacesSelectorList = /* html */ `
<div class="columns">
  <PlacesSelectorListItem item="{{item}}" ui:each="item of data"/>
</div>`

export const PlacesSelectorListItem = /* html */ `
  <div class="column col-4 col-sm-12">
    <div class="card">
        <div class="card-image" data-modal="true" click="{{assign}}">
            <Parallax backImage="{{item.photo}}"/>
        </div>
        <div class="card-header">
          <div class="form-group">
            <label class="form-switch">
              <input type="checkbox" checked="{{item.selected}}" data-id="{{item.id}}" toggle="-> togglePlace"/>
              <i class="form-icon"></i><h5 class="card-title">{{item.title|subject}}</h5>
            </label>
          </div>     
        </div>
    </div>
    <Modal title="{{item.title|subject}}" ui:if="modal" close="{{assign}}">
      <span>{{item.description}}</span>
      <a href="{{item.link}}" target="_blank">More...</a>
    </Modal>
  </div>`