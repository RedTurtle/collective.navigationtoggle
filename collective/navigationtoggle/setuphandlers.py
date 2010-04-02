# -*- coding: utf-8 -*-

def setupVarious(context):
    portal = context.getSite()

    if context.readDataFile('collective.navigationtoggle.txt') is None:
        return
