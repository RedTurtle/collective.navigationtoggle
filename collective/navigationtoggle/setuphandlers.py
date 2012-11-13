# -*- coding: utf-8 -*-

from Products.CMFCore.utils import getToolByName

from collective.navigationtoggle import logger

PROFILE_ID = 'profile-collective.navigationtoggle:default'

def setupVarious(context):
    portal = context.getSite()

    if context.readDataFile('collective.navigationtoggle.txt') is None:
        return

def migrateTo2000(context):
    setup_tool = getToolByName(context, 'portal_setup')
    setup_tool.runAllImportStepsFromProfile(PROFILE_ID)
    logger.info('Migrated to version 0.4')

