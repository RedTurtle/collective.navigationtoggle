# -*- coding: utf-8 -*- 

import logging
from zope.i18nmessageid import MessageFactory

messageFactory =  MessageFactory('collective.navigationtoggle')
logger = logging.getLogger('collective.navigationtoggle')

def initialize(context):
    """Initializer called when used as a Zope 2 product."""
