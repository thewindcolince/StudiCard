angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $mdUtil, $mdSidenav, $log, $ionicHistory, $state, $ionicPlatform, $mdDialog, $mdBottomSheet, $mdMenu, $mdSelect) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    $scope.toggleLeft = buildToggler('left');

    function buildToggler(navID) {
      var debounceFn = $mdUtil.debounce(function () {
        $mdSidenav(navID).toggle();
      }, 0);
      return debounceFn;
    }

    $scope.navigateTo = function (stateName) {
      $timeout(function () {
        $mdSidenav('left').close();
        if ($ionicHistory.currentStateName() != stateName) {
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
          $state.go(stateName);
        }
      }, ($scope.isAndroid == false ? 300 : 0));
    };// End navigateTo.

    //closeSideNav is for close side navigation
    //It will use with event on-swipe-left="closeSideNav()" on-drag-left="closeSideNav()"
    //When user swipe or drag md-sidenav to left side
    $scope.closeSideNav = function(){
      $mdSidenav('left').close();
    };

    $ionicPlatform.registerBackButtonAction(function(){

      if($mdSidenav("left").isOpen()){
        //If side navigation is open it will close and then return
        $mdSidenav('left').close();
      }
      else if(jQuery('md-bottom-sheet').length > 0 ) {
        //If bottom sheet is open it will close and then return
        $mdBottomSheet.cancel();
      }
      else if(jQuery('[id^=dialog]').length > 0 ){
        //If popup dialog is open it will close and then return
        $mdDialog.cancel();
      }
      else if(jQuery('md-menu-content').length > 0 ){
        //If md-menu is open it will close and then return
        $mdMenu.hide();
      }
      else if(jQuery('md-select-menu').length > 0 ){
        //If md-select is open it will close and then return
        $mdSelect.hide();
      }

      else{


        if($ionicHistory.backView() == null){

          //Check is popup dialog is not open.
          if(jQuery('[id^=dialog]').length == 0 ) {

            // mdDialog for show $mdDialog to ask for
            // Confirmation to close the application.

            $mdDialog.show({
              controller: 'DialogController',
              templateUrl: 'confirm-dialog.html',
              targetEvent: null,
              locals: {
                displayOption: {
                  title: "Confirmation",
                  content: "Do you want to close the application?",
                  ok: "Confirm",
                  cancel: "Cancel"
                }
              }
            }).then(function () {
              //If user tap Confirm at the popup dialog.
              //Application will close.
              ionic.Platform.exitApp();
            }, function () {
              // For cancel button actions.
            }); //End mdDialog
          }
        }
        else{
          //Go to the view of lasted state.
          $ionicHistory.goBack();
        }
      }

    },100);

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close i

    $scope.user={
      name:"",
      pass:""
    };
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    console.log($scope.user);

    if(($scope.user.name="colince") && ($scope.user.pass=="franklin")){
      $scope.modal.hide();
      $scope.user.name="";
      $scope.user.pass="";
    }else{
       alert("veillez entrez les bonne informations");
      console.log("pass incorrere");
    }

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
   // $timeout(function() {
      //$scope.closeLogin();
   // }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'auto-ecole', id: 1 },
    { title: 'clinique', id: 2 },
    { title: 'hopitale', id: 3 },
    { title: 'transport', id: 4 },
    { title: 'ecole', id: 5 },
    { title: 'universite', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});

