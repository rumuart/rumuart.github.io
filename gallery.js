$(window).on("load", function () {

        var elem = document.documentElement;
        function openFullscreen() {
          if (elem.requestFullscreen) {
            elem.requestFullscreen();
          } else if (elem.webkitRequestFullscreen) {
            /* Safari */
            elem.webkitRequestFullscreen();
          } else if (elem.msRequestFullscreen) {
            /* IE11 */
            elem.msRequestFullscreen();
          }
        }

        function closeFullscreen() {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
          }
        }
      

      
        document.querySelectorAll(".image").forEach((image) => {
          image.onclick = () => {
            document.querySelector(".popup-image").style.display = "block";
            document.querySelector(".popup-image img").src =
              image.getAttribute("src");
          };
        });

        document.querySelector(" #extend").onclick = () => {
          document.querySelector(".popup-image").style.display = "block";
          let src = document
            .querySelector(".slick-current img")
            .getAttribute("data-");

          document.querySelector(".popup-image img").src = src;
        };

        document.querySelectorAll(".dummy").forEach((span) => {
          span.onclick = () => {
            document.querySelector(".popup-image").style.display = "block";
            document.querySelector(".popup-image img").src =
              span.getAttribute("src");
          };
        });

        document.querySelector(" #full").onclick = () => {
          var isFullScreen =
            document.fullScreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen ||
            document.msFullscreenElement != null;
          if (isFullScreen) {
            closeFullscreen();
          } else {
            openFullscreen();
          }
        };

        document.querySelector(" #close").onclick = () => {
          closeFullscreen();
          document.querySelector(".popup-image").style.display = "none";
        };

        $(function () {
          $(".popup-image").click(function (e) {
            if (e.target.id == "pp" || $(e.target).parents("pp").length) {
              document.querySelector(".popup-image").style.display = "none";
              var isFullScreen =
            document.fullScreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen ||
            document.msFullscreenElement != null;
          if (isFullScreen) {
            closeFullscreen();
          } else {
            
          }
            } else {
            }
          });
        });

        let exp = document.querySelector(" #expand");
        exp.onclick = () => {
          let gall = document.querySelector(".container");
          let slider = document.querySelector(".slider");
          
          if (gall.getAttribute("data-") === "closed") {
            document.querySelector(" #extend").style.display = "none";
            gall.style.height = "1000px";
            gall.setAttribute("data-", "open");
            slider.style.height = "0px";
            slider.style.margin = "0px";
            document.querySelector(" #exp").style.display = "none";
            setTimeout(function () {
              gall.style.height = "auto";
              exp.style.position = "sticky";
              exp.style.top = '180px';
              document.querySelector(" #arrow").style.display = "block";
              console.log(111);
            }, 300);
          } else {
            gall.style.height = "0px";
            gall.setAttribute("data-", "closed");

            slider.style.height = "450px";
            slider.style.marginBottom = '30px';
            document.querySelector(" #arrow").style.display = "none";
            exp.style.position = "relative";
            exp.style.top = '0px';
            setTimeout(function () {
              document.querySelector(" #extend").style.display = "block";
              
              document.querySelector(" #exp").style.display = "block";
            }, 300);
          }
        };
      
       
         
         

        $(".center").slick({
            dots: true,
            centerPadding: 0,
            centerMode: true,
            slidesToShow: 5,
            slidesToScroll: 3,
            variableWidth: true,
            infinite: true,
            focusOnSelect: true,
          });



        });
      