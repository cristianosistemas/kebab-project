/**
 * Kebab AboutMe Application Bootstrap Class
 * 
 * @category    Kebab (kebab-reloaded)
 * @package     Applications
 * @namespace   KebabOS.applications.aboutMe.application.controllers
 * @author      Tayfun Öziş ERİKAN <tayfun.ozis.erikan@lab2023.com>
 * @copyright   Copyright (c) 2010-2011 lab2023 - internet technologies TURKEY Inc. (http://www.lab2023.com)
 * @license     http://www.kebab-project.com/cms/licensing
 */
KebabOS.applications.aboutMe.application.controllers.Index = Ext.extend(Ext.util.Observable, {
    
    // Application bootstrap
    bootstrap: null,
    
    constructor: function(config) {
        
        // Base Config
        Ext.apply(this, config || {});
        
        // Call Superclass initComponent() method
        KebabOS.applications.aboutMe.application.controllers.Index.superclass.constructor.apply(this, arguments);
        
        this.init();
    },
    
    // Initialize and define routing settings
    init: function() {

        this.bootstrap.layout.mainProfileForm.on('showHidePasswordForm', this.toggleCollapseAction, this);
        this.bootstrap.layout.passwordForm.on('showHidePasswordForm', this.toggleCollapseAction, this);
        this.bootstrap.layout.mainProfileForm.on('mainProfileFormOnSave', this.formOnSaveAction, this);
        this.bootstrap.layout.passwordForm.on('passwordFormOnSave', this.formOnSaveAction, this);

    },
    
    // Actions -----------------------------------------------------------------

    toggleCollapseAction: function(from) {
        from.toggleCollapse();
    },

    formOnSaveAction: function(data) {

        if (data.from.getForm().isValid()) {
            
            data.from.getForm().submit({
                url: data.url,
                method: 'PUT',
                success : function() {
                    Kebab.helper.message(this.bootstrap.launcher.text, 'Success');
                    if(data.toggle){
                        data.from.fireEvent('showHidePasswordForm', data.from);
                        data.from.getForm().reset();
                    }
                },
                failure : function() {
                    Kebab.helper.message(this.bootstrap.launcher.text, 'Failure', true);
                }, scope:this
            });
        }
    }
});
