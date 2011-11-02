# -*- coding: utf-8 -*-

from zope.interface import Interface
from zope import schema

from collective.navigationtoggle import ntoggleMessageFactory as _

class INavigationToggleSettings(Interface):
    """collective.navigationtoggle settings"""
    
    selectors = schema.Tuple(
            title=_(u"Link selectors"),
            description=_(u'Make those navigation links able to expand/collapse.\n '
                          u'You can provide the URL relative path (omitting the '
                          u'site id) - e.g: "/folder/subfolder".\n '
                          u'You can also provide a standard jQuery selector expression '
                          u'(see http://docs.jquery.com/Selectors)'),
            required=False,
            default=(),
            missing_value=(),
            value_type=schema.TextLine(),
        )
