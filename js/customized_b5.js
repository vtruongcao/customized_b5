function CustomizedB5(options = {}){
  this.page = options.page || 'index';
  this.components = options.components || [];
  this.framework = 'bootstrap';
  this.styles = {
    'aos': 'vendor/aos/aos.css',
    'bootstrap': 'vendor/bootstrap/css/bootstrap.css',
    'bootstrap-icons': 'vendor/bootstrap-icons/bootstrap-icons.css',
    'fontawesome-free': 'vendor/fontawesome-free/css/all.css',
    'nouislider': 'vendor/noUiSlider/nouislider.min.css',
    'quill': 'vendor/quill/quill.snow.css',
    'swiper': 'vendor/swiper/swiper-bundle.min.css',
  };
  this.scripts = {
    'aos': 'vendor/aos/aos.js',
    'bootstrap': 'vendor/bootstrap/js/bootstrap.bundle.min.js',
    'isotope': 'vendor/isotope-layout/isotope.pkgd.min.js',
    'nouislider': 'vendor/noUiSlider/nouislider.min.js',
    'quill': 'vendor/quill/quill.js',
    'swiper': 'vendor/swiper/swiper-bundle.min.js',
  };

  this._init()
}

CustomizedB5.prototype = {
  _init: function(){
    // add link tags to head
    this.addStyles([this.framework].concat(this.components));

    // add script tags to body
    this.addScripts([this.framework].concat(this.components));

    // add snippet js for page
    this.addSnippetJs();

  },
  addScripts: function(useArr=[]){
    var scripts = this.scripts,
      mainJs = document.getElementById('main-js');
    if(useArr.length > 0){
      useArr.forEach(function(item){
        // add script tag
        if(scripts[item]){
          let script = document.createElement('script');
          script.src = scripts[item];
          mainJs.insertAdjacentElement("beforebegin", script);
        }
      });
    }
  },
  addStyles: function(useArr=[]){
    var styles = this.styles,
      mainCss = document.getElementById('main-css');
    if(useArr.length > 0){
      useArr.forEach(function(item){
        // add link tag
        if(styles[item]){
          let link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = styles[item];
          mainCss.insertAdjacentElement("beforebegin", link);
        }
      });
    }
  },
  addSnippetJs: function(){
    document.addEventListener('DOMContentLoaded', () => {
      /**
       * Preloader
       */
      const preloader = document.querySelector('#preloader');
      if (preloader) {
        window.addEventListener('load', () => {
          preloader.remove();
        });
      }
      /**
       * Mobile nav toggle
       */
      const mobileNavShow = document.querySelector('.mobile-nav-show');
      const mobileNavHide = document.querySelector('.mobile-nav-hide');
      document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
        el.addEventListener('click', function(event) {
          event.preventDefault();
          document.body.classList.toggle('mobile-nav-active');
          mobileNavShow.classList.toggle('d-none');
          mobileNavHide.classList.toggle('d-none');
        })
      });

      /**
       * Scroll top button
       */
      const scrollTop = document.querySelector('.scroll-top');
      if (scrollTop) {
        const togglescrollTop = function() {
          window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
        }
        window.addEventListener('load', togglescrollTop);
        document.addEventListener('scroll', togglescrollTop);
        scrollTop.addEventListener('click', window.scrollTo({
          top: 0,
          behavior: 'smooth'
        }));
      }
      
      /**
       * Toggle mobile nav dropdowns
       */
      const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
      navDropdowns.forEach(el => {
        el.addEventListener('click', function(event) {
          if (document.querySelector('.mobile-nav-active')) {
            event.preventDefault();
            this.classList.toggle('active');
            this.nextElementSibling.classList.toggle('dropdown-active');

            let dropDownIndicator = this.querySelector('.dropdown-indicator');
            dropDownIndicator.classList.toggle('bi-chevron-up');
            dropDownIndicator.classList.toggle('bi-chevron-down');
          }
        })
      });

      /**
       * Animation on scroll function and init
       */
      function aos_init() {
        AOS.init({
          duration: 800,
          easing: 'slide',
          once: true,
          mirror: false
        });
      }
      window.addEventListener('load', () => {
        aos_init();
      });

      /**
       * Increase, Decrease quantity buttons
       */
      var quantitySelector = document.querySelectorAll('.quantity-selector');
      if(quantitySelector.length > 0){
        quantitySelector.forEach(function(i){
          let increaseBtn = i.querySelector('.increaseQty'),
            decreaseBtn = i.querySelector('.decreaseQty'),
            quantityInput = i.querySelector('input'),
            currentValue = parseInt(quantityInput.value);

          increaseBtn.addEventListener('click', function(event){
            currentValue += 1;
            quantityInput.value = currentValue;
          });
          decreaseBtn.addEventListener('click', function(event){
            if(currentValue <= 1) currentValue = 1;
            else currentValue -= 1;
            quantityInput.value = currentValue;
          });
        });
      }

      /**
       * SNIIPPET JS
       */
      switch(this.page){
        case 'index':
          /**
           * Porfolio isotope and filter
           */
          var portfolionIsotope = document.querySelector('.portfolio-isotope');
          if (portfolionIsotope) {
            let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
            let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
            let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

            window.addEventListener('load', () => {
              let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
                itemSelector: '.portfolio-item',
                layoutMode: portfolioLayout,
                filter: portfolioFilter,
                sortBy: portfolioSort
              });

              let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
              menuFilters.forEach(function(el) {
                el.addEventListener('click', function() {
                  document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
                  this.classList.add('filter-active');
                  portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                  });
                  if (typeof aos_init === 'function') {
                    aos_init();
                  }
                }, false);
              });
            });
          }
          break;
        case 'shop':
          /**
           * Sidebar 
           */
          const mobileSidebarShow = document.querySelector('.mobile-sidebar-show');
          const mobileSidebarHide = document.querySelector('.mobile-sidebar-hide');
          document.querySelectorAll('.mobile-sidebar-toggle').forEach(el => {
            el.addEventListener('click', function(event) {
              event.preventDefault();
              document.body.classList.toggle('mobile-sidebar-active');
              mobileSidebarHide.classList.toggle('d-none');
            })
          });

          /**
           * Range Slider
           */
          var slider = document.getElementById('slider-round');
          if(slider){
            var minPrice = document.getElementById('minPrice'),
            maxPrice = document.getElementById('maxPrice'),
            formatForSlider = {
              from: function (formattedValue) {
                  return Number(formattedValue);
              },
              to: function(numericValue) {
                  return Math.round(numericValue);
              }
            };
            window.addEventListener('load', () => {
              noUiSlider.create(slider, {
                start: [0, 3000],
                connect: true,
                range: {
                    'min': 0,
                    'max': 3000
                },
                format: formatForSlider
              });
              slider.noUiSlider.on('update', function (values, handle) {
                var value = values[handle];

                if (handle) {
                  maxPrice.value = value;
                } else {
                  minPrice.value = value;
                }
              });
              minPrice.addEventListener('change', function () {
                slider.noUiSlider.set([this.value, null]);
              });
              maxPrice.addEventListener('change', function () {
                slider.noUiSlider.set([null, this.value]);
              });
            });
          }
          break;
        case 'product-details':
          /**
           * Product details slider
           */
          window.addEventListener('load', () => {
            var thumbnailSlider = new Swiper('.product-thumbnail-slider', {
              loop: false,
              spaceBetween: 10,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              breakpoints: {
                0: {
                  slidesPerView: 2,
                },
                480: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 4,
                },
              },
            });
            new Swiper(".product-details-slider", {
              speed: 600,
              autoplay: {
                delay: 5000,
              },
              slidesPerView: 'auto',
              thumbs: {
                swiper: thumbnailSlider,
              },
            });
          });
          break;
        case 'checkout':
          /**
           * Payment method toggle
           */
          var radioPayment = document.querySelector('input[name="selectedPaymentMethod"]')
          if(radioPayment){
            window.addEventListener('load', () => {
              const bsCollapse = new bootstrap.Collapse('#payment-method-toggle', {
                toggle: false
              })
              document.querySelectorAll('input[name="selectedPaymentMethod"]').forEach((elem) => {
                elem.addEventListener('click', (e) => {
                  if(e.target.value === 'cod'){
                    bsCollapse.hide()
                  } else {
                    bsCollapse.show()
                  }
                })
              })
            })
          }
          break;
        case 'subscriptions':
          /**
           * Testimonials swiper
           */
          window.addEventListener('load', () => {
            new Swiper('.swiper-testimonials-2', {
              speed: 1000,
              loop: true,
              autoplay: {
                delay: 5000,
              },
              slidesPerView: "auto",
              pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true
              },
              breakpoints: {
                320: {
                  slidesPerView: 1,
                  spaceBetween: 40
                },
                1200: {
                  slidesPerView: 2,
                  spaceBetween: 20
                }
              }
            });
          });
          break;
        case 'ask-question':
        case 'question-details':
        case 'ticket-details':
          /**
           * Quill editor
           */
          const quillEditor = document.querySelectorAll('.quill-editor');
          if(quillEditor){
            const toolbarOptions = [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote', 'code-block'],
              ['link', 'image', 'video', 'formula'],
  
              [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
  
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
  
              ['clean']                                         // remove formatting button
            ];
            window.addEventListener('load',()=>{
              const quill = new Quill('.quill-editor', {
                modules: {
                  toolbar: toolbarOptions
                },
                theme: 'snow'
              });
            });
          }
          break;
        case 'manual':
          /**
           * search toggle
           */
          // const mobileSearchShow = document.querySelector('.mobile-search-show');
          // const mobileSearchHide = document.querySelector('.mobile-search-hide');
          
          document.querySelectorAll('.mobile-search-toggle').forEach(el => {
            el.addEventListener('click', function(event) {
              event.preventDefault();
              document.body.classList.toggle('mobile-search-active');
            })
          });

          /**
           * Nav item highlighter
           **/
          const sections = document.querySelectorAll(".paragraph-heading[id]");
          window.addEventListener("scroll", function () {
            // Get current scroll position
            let scrollY = window.pageYOffset;
            
            // Now we loop through sections to get height, top and ID values for each
            sections.forEach(current => {
              const sectionHeight = current.offsetHeight;
              const sectionTop = current.offsetTop - 50;
              var sectionId = current.getAttribute("id");
              
              if (
                scrollY > sectionTop - 30 &&
                scrollY <= sectionTop + sectionHeight
              ){
                document.querySelector(".content-navigation a[href*=" + sectionId + "]").classList.add("active");
              } else {
                document.querySelector(".content-navigation a[href*=" + sectionId + "]").classList.remove("active");
              }
            });
          });

          /**
           * Sidebar 
           */
          document.querySelectorAll('.mobile-sidebar-toggle').forEach(el => {
            el.addEventListener('click', function(event) {
              event.preventDefault();
              document.body.classList.toggle('mobile-sidebar-active');
              mobileSidebarHide.classList.toggle('d-none');
            })
          });
          break;
        default:
          break;
      }
    })
  }
}