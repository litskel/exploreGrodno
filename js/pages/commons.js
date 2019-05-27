export const Hero = /* html */`
<div class="hero bg-dark p-0">
    <div class="hero-body px-2">
    <h1>{{title}}</h1>
    </div>
</div>`

export const RouteMap = /* template */ `
    <iframe width="100%" height="450" frameborder="0" 
    style="border:0"
    src="{{src}}"
    allowfullscreen="1"></iframe>`

export const Header = /* html */`
  <header class="navbar bg-secondary">
    <section class="navbar-section mx-2">
      <Breadcrumbs ui:props="<- nav://item"/>
    </section>
    <section class="navbar-center">
        <img src="/assets/grodno2.svg" alt="Spectre.css" height="40" width="40"/>
    </section>
    <section class="navbar-section mx-2">
      <UserBar ui:props="<- user:info"/>
    </section>
  </header>`

export const BigRedButton = /* html */`    
  <button class="btn tooltip tooltip-left fixed bg-error circle" 
  style="right:1rem; bottom:1rem; width: 2rem;" 
  data-tooltip="{{tooltip}}" click="{{action}}">
  <i class="icon icon-plus"></i>
  </button>`
