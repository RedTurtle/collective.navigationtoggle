# -*- coding: utf-8 -*-

from zope.interface import Interface
from zope import schema

from collective.navigationtoggle import messageFactory as _

class INavigationToggleLayer(Interface):
    """Layer interface for collective.navigationtoggle"""


class INavigationToggleSettings(Interface):
    """collective.navigationtoggle settings"""
    
    selectors = schema.Tuple(
            title=_(u"Link selectors"),
            description=_('help_link_selectors',
                          default=u'Make those navigation links able to expand/collapse.\n'
                                  u'You can provide the URL relative path (omitting the '
                                  u'site id) - e.g: "/folder/subfolder".\n'
                                  u'You can also provide a standard jQuery selector expression '
                                  u'(see http://api.jquery.com/category/selectors).'),
            required=False,
            default=(),
            missing_value=(),
            value_type=schema.TextLine(),
        )

    delay = schema.Int(
            title=_(u"Animation delay"),
            description=_('help_animation_delay',
                          default=u'If provided, enable an animation when navigations are expanded/collapsed\n.'
                                  u'Animation will require the given number of missilecons to be completed.\n'
                                  u'Leave 0 to disable animation.'),
            required=True,
            default=0,

        )

    client_cache = schema.Bool(
            title=_(u"Cache"),
            description=_('help_client_cache',
                          default=u'Cache result of the opened navigation when it\'s expanded.'),
            required=True,
            default=True,

        )

    toggle_container_classes = schema.Tuple(
            title=_(u"Toggle container classes"),
            description=_('help_toggle_container_class',
                          default=u'Looks only for links inside HTML elements with those CSS classes.\n'
                                  u'Note that this option is used only if you provided toggle links as normal URL path '
                                  u'(not for complex jQuery expressions).'),
            required=False,
            default=('portletNavigationTree',),
            missing_value=(),
            value_type=schema.TextLine(),
        )

    list_type = schema.ASCIILine(
            title=_(u"HTML list type"),
            description=_('help_list_type',
                          default=u'The type of list element to looks for inside navigation(s).\n'
                                  u'This is the element that the toggle feature will try to clone.'),
            required=True,
            default='ul',
        )

    list_item = schema.ASCIILine(
            title=_(u"HTML list element"),
            description=_('help_list_item',
                          default=u'The item of a single list entry to looks for inside navigations.\n'
                                  u'This is the element that the toggle feature will generate when expandig.'),
            required=True,
            default='li',
        )

