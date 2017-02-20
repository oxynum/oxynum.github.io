"use strict";angular.module("oxynum2016App",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","duScroll"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("oxynum2016App").controller("MainCtrl",["$scope","$document",function(a,b){a.pageClass="main-view",a.welcome=!0,sessionStorage.user||(a.welcome=!1),sessionStorage.setItem("user","on"),a.scrollTo=function(a){var c=document.getElementById(a);b.scrollToElementAnimated(angular.element(c),0,1e3,null)}}]),angular.module("oxynum2016App").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("oxynum2016App").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<!-- <div class="wrapper-welcome" ng-class="{\'inactive\': welcome}">\n	<div class="container">\n		<div class="content">\n			<div class="logo-wrapper">\n				<div class="clouds-position">\n					<span style="background-image: url(images/cloud.532c4ba1.svg)" class="img-cloud top left-to-right"></span>\n					<span class="index">2</span>\n					<span style="background-image: url(images/cloud.532c4ba1.svg)" class="img-cloud bottom right-to-left"></span>\n				</div>\n			</div>\n			<button class="button-enter blink" ng-click="welcome = true">Entrer</button>\n		</div>\n	</div>\n</div> --> <div class="full-screen wrapper" role="main"> <div class="full-screen team-member thomas"> <div class="centered-content"> <div class="role">Open source contributor</div> <div class="name">Thomas</div> <div class="quote"> <p> </p> </div> </div> <div class="go-down"> <span class="next-member">Hugo</span> <div class="arrow-go-to bounce" ng-click="scrollTo(\'hugo\');" title="Qui est Hugo ?"></div> </div> </div> <div class="full-screen team-member hugo" id="hugo"> <div class="centered-content"> <div class="role">Dév Back-End - Rails addict</div> <div class="name">Hugo</div> <div class="quote"> <p> <span>Hugo, dessine-moi un mouton !</span> <span>- C\'est fait, mais j\'ai aussi ajouté un loup, une bergerie et la prairie si besoin</span> </p> </div> </div> <div class="go-down"> <span class="next-member">Pierrick</span> <div class="arrow-go-to bounce" ng-click="scrollTo(\'pierrick\');" title="Qui est pierrick ?"></div> </div> </div> <div class="full-screen team-member pierrick" id="pierrick"> <div class="centered-content"> <div class="role">Développeur Web & Mobile</div> <div class="name">Pierrick</div> <div class="quote"> <p> <span>Une cuillerée d\'HTML5, 1 pincée de JS.</span> <span>Mélanger le tout avec Cordova puis servir chaud sur les stores.</span> </p> </div> </div> <div class="go-down"> <span class="next-member">Sandrine</span> <div class="arrow-go-to bounce" ng-click="scrollTo(\'sandrine\');" title="Qui est Sandrine ?"></div> </div> </div> <div class="full-screen team-member sandrine" id="sandrine"> <div class="centered-content"> <div class="role">Assistante marketing</div> <div class="name">Sandrine</div> <div class="quote"> <p> <span>Écouter, c\'est une capacité. Analyser, c\'est un métier.</span> </p> </div> </div> <div class="go-down"> <span class="next-member">Yvan</span> <div class="arrow-go-to bounce" ng-click="scrollTo(\'yvan\');" title="Qui est Yvan ?"></div> </div> </div> <div class="full-screen team-member yvan" id="yvan"> <div class="centered-content"> <div class="role">Développeur Web Fullstack</div> <div class="name">Yvan</div> <div class="quote"> <p> <span>Un peu d\'HTML, un peu de CSS.. Un peu de JS, un peu de PHP..</span> <span>Avec un peu de tout, on commence à pouvoir faire beaucoup !</span> </p> </div> </div> <div class="go-down"> <span class="next-member">Rudy</span> <div class="arrow-go-to bounce" ng-click="scrollTo(\'rudy\');" title="Qui est Rudy ?"></div> </div> </div> <div class="full-screen team-member rudy" id="rudy"> <div class="centered-content"> <div class="role">Développeur Front-End</div> <div class="name">Rudy</div> <div class="quote"> <p> <span>Nous n\'offrons pas de service</span> <span>Nous garantissons une bonne qualité de service</span> </p> </div> </div> </div> </div>')}]);