# -*- coding: utf-8 -*-

#from Products.Five.browser.pagetemplatefile import ViewPageTemplateFile

from Products.statusmessages.interfaces import IStatusMessage

from plone.app.registry.browser import controlpanel

from z3c.form import button

from collective.navigationtoggle.interfaces import INavigationToggleSettings
from collective.navigationtoggle import messageFactory as _


class NavigationToggleEditForm(controlpanel.RegistryEditForm):
    """collective.navigationtoggle settings form.
    """
    schema = INavigationToggleSettings
    id = "NavigationToggleSettingsEditForm"
    label = _(u"Navigation Toggle settings")
    description = _(u"help_navigationtoggle_settings_editform",
                    default=u"Manage on which elements the navigation toggle must be activated")

    @button.buttonAndHandler(_('Save'), name='save')
    def handleSave(self, action):
        data, errors = self.extractData()
        if errors:
            self.status = self.formErrorsMessage
            return
        changes = self.applyChanges(data)
        IStatusMessage(self.request).addStatusMessage(_(u"Changes saved"),
                                                      "info")
        self.context.REQUEST.RESPONSE.redirect("@@navigationtoggle-settings")

    @button.buttonAndHandler(_('Cancel'), name='cancel')
    def handleCancel(self, action):
        IStatusMessage(self.request).addStatusMessage(_(u"Edit cancelled"),
                                                      "info")
        self.request.response.redirect("%s/%s" % (self.context.absolute_url(),
                                                  self.control_panel_view))

    def updateWidgets(self):
        super(NavigationToggleEditForm, self).updateWidgets()
        self.widgets['selectors'].style = u'width: 100%';
        self.widgets['selectors'].klass += u" autoresize";
        self.widgets['selectors'].rows = 7
        self.widgets['delay'].size = 4;
        self.widgets['delay'].maxlength = 4;


class NavigationToggleSettingsControlPanel(controlpanel.ControlPanelFormWrapper):
    """Navigationtoggle settings control panel.
    """
    form = NavigationToggleEditForm
    #index = ViewPageTemplateFile('controlpanel.pt')
