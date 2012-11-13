# -*- coding: utf-8 -*-

from collective.navigationtoggle import logger

def uninstall(portal, reinstall=False):
    if not reinstall:
        setup_tool = portal.portal_setup
        setup_tool.runAllImportStepsFromProfile('profile-collective.navigationtoggle:uninstall')
        logger.info("Uninstall complete")