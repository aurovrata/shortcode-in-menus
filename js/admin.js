jQuery('document').ready(function() {
        
        jQuery('#submit-gs-sim').on('click', function(e) {
                // call registerChange like any add
                wpNavMenu.registerChange();
                
                // call our custom function
                gsSimAddWidgettoMenu();
        });
        jQuery('#submit-gs-cim').on('click', function(e) {
                // call registerChange like any add
                wpNavMenu.registerChange();
                
                // call our custom function
                gsCimAddWidgettoMenu();
        });
        var before ='<p style="margin:0;">Callback=my_function<br/>key=value</p>';
        var message = "will call the following function ";
        var after = '<pre style="overflow-x:auto;margin:0;">my_function($nav_label, $title, $link_target, ("key"=>"value"))</pre>'; 
        jQuery('.menu-item-gs_cim .menu-item-settings .field-description label span.description').text(message).before(before).after(after);
         /**
         * Add our custom Callback object to Menu
         * 
         * @returns {Boolean}
         */
        function gsCimAddWidgettoMenu( ) {
                
                // get the description
                description = jQuery('#gs-cim-html').val();
                
                // initialise object
                menuItems = {};
                
                // the usual method for ading menu Item
                processMethod = wpNavMenu.addMenuItemToBottom;
                
                var t = jQuery('.gs-cim-div');

                // Show the ajax spinner
                t.find('.spinner').show();
                
                // regex to get the index
                re = /menu-item\[([^\]]*)/;

                m = t.find('.menu-item-db-id');
                // match and get the index
                listItemDBIDMatch = re.exec(m.attr('name')),
                        listItemDBID = 'undefined' == typeof listItemDBIDMatch[1] ? 0 : parseInt(listItemDBIDMatch[1], 10);
                
                // assign data
                menuItems[listItemDBID] = t.getItemData('add-menu-item', listItemDBID);
                menuItems[listItemDBID]['menu-item-description'] = description;
                
                if(menuItems[listItemDBID]['menu-item-title'] === ''){
                        menuItems[listItemDBID]['menu-item-title'] = '(Untitled)';
                }
                
                // get our custom nonce
                nonce = jQuery('#gs-cim-description-nonce').val();
                
                // set up params for our ajax hack
                params = {
                        'action': 'gs_cim_description_hack',
                        'description-nonce': nonce,
                        'menu-item': menuItems[listItemDBID]
                };
                
                // call it
                jQuery.post(ajaxurl, params, function(objectId) {
                        
                        // returns the incremented object id, add to ui
                        jQuery('#gs-cim-div .menu-item-object-id').val(objectId);
                        
                        // now call the ususl addItemToMenu
                        wpNavMenu.addItemToMenu(menuItems, processMethod, function() {
                                // Deselect the items and hide the ajax spinner
                                t.find('.spinner').hide();
                                // Set form back to defaults
                                jQuery('#gs-cim-title').val('').blur();
                                jQuery('#gs-cim-html').val('');

                        });

                });


        }
        /**
         * Add our custom Shortcode object to Menu
         * 
         * @returns {Boolean}
         */
        function gsSimAddWidgettoMenu( ) {
                
                // get the description
                description = jQuery('#gs-sim-html').val();
                
                // initialise object
                menuItems = {};
                
                // the usual method for ading menu Item
                processMethod = wpNavMenu.addMenuItemToBottom;
                
                var t = jQuery('.gs-sim-div');

                // Show the ajax spinner
                t.find('.spinner').show();
                
                // regex to get the index
                re = /menu-item\[([^\]]*)/;

                m = t.find('.menu-item-db-id');
                // match and get the index
                listItemDBIDMatch = re.exec(m.attr('name')),
                        listItemDBID = 'undefined' == typeof listItemDBIDMatch[1] ? 0 : parseInt(listItemDBIDMatch[1], 10);
                
                // assign data
                menuItems[listItemDBID] = t.getItemData('add-menu-item', listItemDBID);
                menuItems[listItemDBID]['menu-item-description'] = description;
                
                if(menuItems[listItemDBID]['menu-item-title'] === ''){
                        menuItems[listItemDBID]['menu-item-title'] = '(Untitled)';
                }
                
                // get our custom nonce
                nonce = jQuery('#gs-sim-description-nonce').val();
                
                // set up params for our ajax hack
                params = {
                        'action': 'gs_sim_description_hack',
                        'description-nonce': nonce,
                        'menu-item': menuItems[listItemDBID]
                };
                
                // call it
                jQuery.post(ajaxurl, params, function(objectId) {
                        
                        // returns the incremented object id, add to ui
                        jQuery('#gs-sim-div .menu-item-object-id').val(objectId);
                        
                        // now call the ususl addItemToMenu
                        wpNavMenu.addItemToMenu(menuItems, processMethod, function() {
                                // Deselect the items and hide the ajax spinner
                                t.find('.spinner').hide();
                                // Set form back to defaults
                                jQuery('#gs-sim-title').val('').blur();
                                jQuery('#gs-sim-html').val('');

                        });

                });


        }

});
