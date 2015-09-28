var LifeClue;
(function (LifeClue) {
    var Setting = (function () {
        function Setting(args) {
            if (Setting._instance) {
                throw new Error("Error: Instantiation failed: Use Setting.getInstance() instead of new.");
            }
            Setting._instance = this;
        }
        Setting.getInstance = function () {
            return Setting._instance;
        };
        Setting.setBaseUrl = function (url) {
            Setting._instance.baseUrl = url;
        };
        Setting.getBaseUrl = function () {
            return Setting._instance.baseUrl;
        };
        Setting.getPhpDir = function () {
            return Setting.getBaseUrl() + "core/php/";
        };
        Setting.getImageDir = function () {
            return Setting.getBaseUrl() + "core/image/";
        };
        Setting.prototype.getSiteName = function () {
            return "LifeClue";
        };
        Setting.prototype.getStartGameText = function () {
            return "Start Game";
        };
        Setting.prototype.getClaimLocationText = function () {
            return "Claim Location";
        };
        Setting.prototype.nonAvailableText = function () {
            return "";
        };
        Setting.prototype.getDetectGeoLocationText = function () {
            return "Show My Location";
        };
        Setting.prototype.getSelectYourCharacterText = function () {
            return "Select Your Character";
        };
        Setting.prototype.getCharacter1Name = function () {
            return "Miss Scarlett";
        };
        Setting.prototype.getCharacter2Name = function () {
            return "Professor Plum";
        };
        Setting.prototype.getCharacter3Name = function () {
            return "Mrs. Peacock";
        };
        Setting.prototype.getCharacter4Name = function () {
            return "Reverend Green";
        };
        Setting.prototype.getCharacter5Name = function () {
            return "Colonel Mustard";
        };
        Setting.prototype.getCharacter6Name = function () {
            return "Mrs. Black";
        };
        Setting.prototype.getPageBaseLayoutTemplate = function () {
            var template = '';
            template += '<div id="wrapper-nav"></div>';
            template += '<div id="wrapper-page">';
            template += '<div id="wrapper-body">';
            template += '<div id="panel-status"><%= status %></div>';
            template += '<div id="panel-body"></div>';
            template += '<div id="panel-wing"></div>';
            template += '</div>';
            template += '<div id="wrapper-header"><%= title %><div id="gps-status"></div><div id="database-status"></div><div id="menu-header"></div></div>';
            template += '</div>';
            return template;
        };
        Setting.prototype.getMapBasicControlLayoutTemplate = function () {
            var template = '';
            template += '<div class="leaflet-control">';
            template += '<div class="control-button locate"></div>';
            template += '</div>';
            return template;
        };
        Setting.prototype.getWingCharacterSelectTemplate = function () {
            var template = '';
            template += '<div class="col-xs-12 col-left-padding">';
            template += '<button type="button" id="detect-location" class="btn btn-default"><%= detect %></button>';
            template += '</div>';
            template += '<div class="col-xs-12 col-top-padding">';
            template += '<div class="wing-h1"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> <%= select %></div>';
            template += '</div>';
            template += '<button type="button" id="c1s" class="btn btn-default transparent character-name character-1"><%= character1 %></button>';
            template += '<button type="button" id="c2s" class="btn btn-default transparent character-name character-2"><%= character2 %></button>';
            template += '<button type="button" id="c3s" class="btn btn-default transparent character-name character-3"><%= character3 %></button>';
            template += '<button type="button" id="c4s" class="btn btn-default transparent character-name character-4"><%= character4 %></button>';
            template += '<button type="button" id="c5s" class="btn btn-default transparent character-name character-5"><%= character5 %></button>';
            template += '<button type="button" id="c6s" class="btn btn-default transparent character-name character-6"><%= character6 %></button>';
            template += '<div class="col-xs-12">';
            template += '<div class="wing-h2"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> <span id="message"><%= message %></span></div>';
            template += '</div>';
            template += '<div class="col-xs-12">';
            template += '<button type="button" id="start-game" class="btn btn-default hidden"><%= start %></button>';
            template += '</div>';
            template += '<div class="col-xs-12">';
            template += '</div>';
            return template;
        };
        Setting.prototype.getWingPlayNoteTemplate = function () {
            var template = '';
            template += '<div class="col-xs-12 col-left-padding">';
            template += '<button type="button" id="claim-location" class="btn btn-default"><%= location %></button>';
            template += '</div>';
            template += '<div id="panel-show-suggestion">';
            template += '</div>';
            template += '<div id="panel-guess">';
            template += '</div>';
            template += '<div class="col-xs-12">';
            template += '<hr>';
            template += '</div>';
            template += '<div class="col-xs-12">';
            template += '<div class="wing-h1"><span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Check List</div>';
            template += '</div>';
            template += '<% _.each(locations.models, function (location) { %>';
            template += '<div class="form-group">';
            template += '<div class="col-xs-6 layer-checkbox layer-checkbox-header">';
            template += '<label class="label-header"><input type="checkbox" data-card="<%= location.get("id") %>">&nbsp <%= location.get("name") %></label>';
            template += '</div>';
            template += '<div class="col-xs-6">';
            template += '<input type="text" data-card="<%= location.get("id") %>"></input>';
            template += '</div>';
            template += '</div>';
            template += '<% }); %>';
            template += '<div class="col-xs-12">';
            template += '<hr>';
            template += '</div>';
            template += '<% _.each(characters.models, function (character) { %>';
            template += '<div class="form-group">';
            template += '<div class="col-xs-6 layer-checkbox layer-checkbox-header">';
            template += '<label class="label-header"><input type="checkbox" data-card="<%= character.get("id") %>">&nbsp <%= character.get("name") %></label>';
            template += '</div>';
            template += '<div class="col-xs-6">';
            template += '<input type="text" data-card="<%= character.get("id") %>"></input>';
            template += '</div>';
            template += '</div>';
            template += '<% }); %>';
            template += '<div class="col-xs-12">';
            template += '<hr>';
            template += '</div>';
            template += '<% _.each(weapons.models, function (weapon) { %>';
            template += '<div class="form-group">';
            template += '<div class="col-xs-6 layer-checkbox layer-checkbox-header">';
            template += '<label class="label-header"><input type="checkbox" data-card="<%= weapon.get("id") %>">&nbsp <%= weapon.get("name") %></label>';
            template += '</div>';
            template += '<div class="col-xs-6">';
            template += '<input type="text" data-card="<%= weapon.get("id") %>"></input>';
            template += '</div>';
            template += '</div>';
            template += '<% }); %>';
            template += '<div class="col-xs-12">';
            template += '<hr>';
            template += '</div>';
            return template;
        };
        Setting.prototype.getWingShowSuggestionTemplate = function () {
            var template = '';
            template += '<div class="col-xs-12 col-top-padding">';
            template += '<div class="wing-h2"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> <span><%= message %></span></div>';
            template += '</div>';
            template += '<div id="panel-show-card">';
            template += '</div>';
            return template;
        };
        Setting.prototype.getWingShowWinnerTemplate = function () {
            var template = '';
            template += '<div class="col-xs-12 col-top-padding">';
            template += '</div>';
            template += '<div class="col-xs-12 col-top-padding">';
            template += '<div class="wing-h1"><span class="glyphicon glyphicon-thumbs-up" aria-hidden="true"></span> Winner</div>';
            template += '</div>';
            template += '<div class="col-xs-12 col-top-padding">';
            template += '<div class="wing-h2"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> <span><%= message %></span></div>';
            template += '</div>';
            template += '<div id="panel-show-card">';
            template += '</div>';
            return template;
        };
        Setting.prototype.getWingShowCardTemplate = function () {
            var template = '';
            template += '<div class="form-group">';
            template += '<label for="show-card" class="col-xs-3 control-label">Card</label>';
            template += '<div class="col-xs-9">';
            template += '<select id="show-card" class="selectpicker">';
            template += '<% _.each(cards, function (card) { %>';
            template += '<option data-card="<%= card.get("id") %>"><%= card.get("name") %></option>';
            template += '<% }); %>';
            template += '</select>';
            template += '</div>';
            template += '</div>';
            template += '<div class="col-xs-12">';
            template += '<button type="button" id="submit-show-card" class="btn btn-default">Show Card</button>';
            template += '</div>';
            return template;
        };
        Setting.prototype.getWingShowCardResultTemplate1 = function () {
            var template = '';
            template += '<div class="col-xs-12 col-top-padding">';
            template += '<div class="wing-h2"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> <span><%= message %></span></div>';
            template += '</div>';
            template += '<div class="col-xs-12">';
            template += '<button type="button" id="finish-turn" class="btn btn-default">Finish Your Turn</button>';
            template += '</div>';
            return template;
        };
        Setting.prototype.getWingShowCardResultTemplate2 = function () {
            var template = '';
            template += '<div class="col-xs-12 col-top-padding">';
            template += '<div class="wing-h2"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span> <span><%= message %></span></div>';
            template += '</div>';
            return template;
        };
        Setting.prototype.getWingMakeGuessTemplate = function () {
            var template = '';
            template += '<div class="col-xs-12 col-top-padding">';
            template += '<div class="wing-h1"><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span> Make Suggestion</div>';
            template += '</div>';
            template += '<div class="form-group">';
            template += '<label for="guess-location" class="col-xs-3 control-label">Location</label>';
            template += '<div class="col-xs-9">';
            template += '<select id="guess-location" class="selectpicker">';
            template += '<option data-card="<%= locationId %>"><%= locationName %></option>';
            template += '</select>';
            template += '</div>';
            template += '</div>';
            template += '<div class="form-group">';
            template += '<label for="guess-suspect" class="col-xs-3 control-label">Suspect</label>';
            template += '<div class="col-xs-9">';
            template += '<select id="guess-suspect" class="selectpicker">';
            template += '<option>None</option>';
            template += '<% _.each(characters.models, function (character) { %>';
            template += '<option data-card="<%= character.get("id") %>"><%= character.get("name") %></option>';
            template += '<% }); %>';
            template += '</select>';
            template += '</div>';
            template += '</div>';
            template += '<div class="form-group">';
            template += '<label for="guess-weapon" class="col-xs-3 control-label">Weapon</label>';
            template += '<div class="col-xs-9">';
            template += '<select id="guess-weapon" class="selectpicker">';
            template += '<option>None</option>';
            template += '<% _.each(weapons.models, function (weapon) { %>';
            template += '<option data-card="<%= weapon.get("id") %>"><%= weapon.get("name") %></option>';
            template += '<% }); %>';
            template += '</select>';
            template += '</div>';
            template += '</div>';
            template += '<div class="col-xs-12">';
            template += '<button type="button" id="submit-guess" class="btn btn-default">Submit Guess</button>';
            template += '</div>';
            template += '<div class="col-xs-12">';
            template += '</div>';
            return template;
        };
        Setting.prototype.getTileMapAddress = function () {
            return 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        };
        Setting.prototype.getDefaultZoomLevel = function () {
            return 19;
        };
        Setting.prototype.getMinZoomLevel = function () {
            return 17;
        };
        Setting.prototype.getMaxZoomLevel = function () {
            return 19;
        };
        Setting.prototype.getWingViewShowDelay = function () {
            return 500;
        };
        Setting.prototype.getStatusMessageDuration = function () {
            return 10000;
        };
        Setting._instance = new Setting();
        return Setting;
    })();
    LifeClue.Setting = Setting;
})(LifeClue || (LifeClue = {}));
