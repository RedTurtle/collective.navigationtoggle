# -*- coding: utf-8 -*-

def uninstall(portal, reinstall=False):
    if not reinstall:
        setup_tool = portal.portal_setup
        setup_tool.setBaselineContext('profile-collective.navigationtoggle:uninstall')
        setup_tool.runAllImportStepsFromProfile('profile-collective.navigationtoggle:uninstall')
