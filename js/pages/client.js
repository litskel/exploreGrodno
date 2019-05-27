
export const ClientApp = /* template */ `
<Sidebar>
  <AsideClient ui:key="aside"/>
  <ClientModule  ui:key="content" route="<- selectedRoute"/>
</Sidebar>
`

export const ClientModule = /* template */ `
<div>     
<Hero title="{{route.title|subject}}"/>
    <div class="container pt-1 bg-gray" style="max-width:940px;">
      <div class="columns">
        <div class="column col-12 col-sm-12">
          <span class="tile-subtitle p-2">{{route.description}}</span>
          <a href="{{route.link}}" target="_blank">More...</a>
        </div>
        <div class="column col-12 col-sm-12">
          <RouteMap src="<- routeMapUrl"/>
        </div>
      </div>
    </div>
    <div class="container my-0 pt-0" style="max-width:940px;">
      <h5 class="tile-subtitle p-2">Places</h5>
      <PlacesList data="<- selectedPlaces" sortBy="created_at"/>
  </div>
</div>`

export const AsideClient = /* html */`
  <div class="panel" style="height: 100%;">
  <div class="panel-header">
  <a class="btn btn-clear show-lg" style="float: right!important" href="#"></a>
    <div class="panel-title">
    <h1>Routes</h1>
    </div>
  </div>
  <div class="panel-nav">
  </div>
  <div class="panel-body">
    <RoutesList data="<- routes"/>
  </div>
  <div class="panel-footer">
  </div>
  </div>
  `

export const PlacesListItem = /* html */ `
    <div class="column col-4 col-sm-12 " data-modal="true" click="{{assign}}">
      <div class="card">
          <div class="card-image">
              <Parallax backImage="{{item.photo}}"/>
          </div>
          <div class="card-header">
          <h5 class="card-title">{{item.title|subject}}</h5>    
          </div>
      </div>
      <Modal title="{{item.title|subject}}" ui:if="modal" close="{{assign}}">
        <span>{{item.description}}</span>
        <a href="{{item.link}}" target="_blank">More...</a>
      </Modal>
    </div>`

export const PlacesList = /* html */ `
  <div class="columns">
    <PlacesListItem item="{{item}}" ui:each="item of data" />
  </div>`

export const RoutesList = /* html */ `
<div class="columns" style="max-width:350px;">
  <div class="column col-12 col-sm-12 mt-1" ui:each="item of data">
    <div class="card">
    <div class="card-header">
    <div class="tile">
      <div class="tile-icon">
          <figure class="avatar avatar-lg bg-primary" data-initial="{{item.title|initials}}">
          <img src="{{item.photo}}" class="img-responsive"/>
          </figure>
        </div>
      <div class="tile-content">
          <p class="tile-title">
          <div>            
            <a class="header" data="{{item}}" click="-> selectRoute">{{item.title|subject}}</a>
          </div>
          </p>
      </div>
    </div>
    </div>
    </div>
  </div>
</div>`