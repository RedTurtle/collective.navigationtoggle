# -*- coding: utf-8 -*-

from zope import interface
from zope.component import queryUtility

from Products.Five.browser import BrowserView
from Products.CMFCore.utils import getToolByName

from plone.registry.interfaces import IRegistry
from collective.navigationtoggle.interfaces import INavigationToggleSettings

class JavaScript(BrowserView):
    """Get the registry contents as a JavaScript object literal"""
    
    JS_LITERAL = """if (jQuery.collective_navigationtoggle) {
%s
}
"""

    JS_MODEL = '    jQuery.collective_navigationtoggle.toggle_elements.push("%s");'
    
    def __call__(self, *args, **kwargs):
        self.request.response.setHeader("Content-type", "text/javascript")
        registry = queryUtility(IRegistry)
        settings = registry.forInterface(INavigationToggleSettings, check=False)
        
        outstr = ""
        for selector in settings.selectors:
            outstr += self.JS_MODEL % selector + '\n' 
        
        return self.JS_LITERAL % outstr

