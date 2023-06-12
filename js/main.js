
const $menu = document.getElementById('main-menu')
const $backdropMenu = document.getElementById('backdropMenu')
let isOn = false
const $sectionNodes = document.querySelectorAll('.main-landing-page .section-standard')
const $menuOptions = document.querySelector('.main-header .ctn-menu_options')
const $itemMainMenu = document.querySelectorAll('.ctn-menu_options li a')
const $dataProductsList = [...document.querySelectorAll('.ctn-description-product .description-product')]
const $iconCloseMenu= document.querySelector('#icon-toogle-menu-mobile')

const OBSERVER = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const isMenuOnTop = entry.target.getAttribute('data-primary')
      const dataId = entry.target.getAttribute('data-id')
      showDescriptionProduct(dataId)
      changeColorOverlay(isMenuOnTop)
    }
  })
},
  {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  })

const SCROLLING = {
  height: window.innerHeight,
  canMove: true,
  position: 0
}
function showDescriptionProduct(dataId) {
  $dataProductsList.forEach($item => {
    Boolean($item.getAttribute('data-primary')) ? $item.classList.add('color-soft') : ''
    $item.getAttribute('data-id') === dataId ? $item.style.display = 'flex' : $item.style.display = 'none'
  })
}
function changeColorOverlay(isMenuOnTop) {
  if (!isMenuOnTop) {
    $menu.classList.add('font-color-dark')
  } else {
    $menu.classList.remove('font-color-dark')
  }
}
function backdropMoveOver({ target }) {
  const { width, x } = target.getClientRects()[0]
  const newWidth = `${width + 20}px`
  const newX = `${x - 10}px`
  $backdropMenu.style.width = newWidth
  $backdropMenu.style.transform = `translateX(${newX})`
  $backdropMenu.style.opacity = 1

  if (isOn) {
    $backdropMenu.classList.add('animation')
  } else {
    isOn = true
  }
}

function backdropMoveLeave(e) {
  $backdropMenu.style.opacity = 0
  $backdropMenu.classList.remove('animation')
}

function toggleMenu(){
  const isOpenMenu= $menuOptions.classList.contains('open-menu-mobile')
  if(isOpenMenu){
    $menuOptions.classList.remove('open-menu-mobile')
  }else{
    $menuOptions.classList.add('open-menu-mobile')
  }
}

$sectionNodes.forEach(entry => OBSERVER.observe(entry))
$menuOptions.addEventListener('mouseleave', () => isOn = false)
$itemMainMenu.forEach(itemList => itemList.addEventListener('mouseover', backdropMoveOver))
$itemMainMenu.forEach(itemList => itemList.addEventListener('mouseleave', backdropMoveLeave))


window.addEventListener('scroll', () => {
  if (!SCROLLING.canMove) return
  const scroll = window.scrollY

  const options = {
    left: 0,
    behavior: 'smooth',
  }
  if (window.scrollY > SCROLLING.position) {
    window.scrollBy({
      ...options,
      top: (SCROLLING.position + (SCROLLING.height - window.scrollY))
    })
  } else {
    window.scrollBy({
      ...options,
      top: (SCROLLING.position - (SCROLLING.height + window.scrollY))
    })
  }
  SCROLLING.canMove = false
})


document.addEventListener('scrollend', () => {
  SCROLLING.position = window.scrollY
  SCROLLING.canMove = true
})

$backdropMenu.addEventListener('click', toggleMenu)
$iconCloseMenu.addEventListener('click', toggleMenu)