# -*- coding: utf-8 -*-

from zope.component import queryUtility

from Products.Five.browser import BrowserView

from plone.registry.interfaces import IRegistry
from collective.navigationtoggle.interfaces import INavigationToggleSettings

class JavaScript(BrowserView):
    """Get the registry contents as a JavaScript object literal"""
    
    JS_LITERAL = """if (jQuery.collective_navigationtoggle) {
%s
%s
}
"""

    JS_MODEL = '    jQuery.collective_navigationtoggle.toggle_elements.push("%s");'
    
    def __call__(self, *args, **kwargs):
        self.request.response.setHeader("Content-type", "text/javascript")
        registry = queryUtility(IRegistry)
        settings = registry.forInterface(INavigationToggleSettings, check=False)
        
        outstr_config = """    jQuery.collective_navigationtoggle.slide_animation = %s;\n""" % settings.delay
        outstr_config += """    jQuery.collective_navigationtoggle.cache = %s;\n""" % \
                (settings.client_cache and 'true' or 'false')
        
        outstr_config += """    jQuery.collective_navigationtoggle.toggleContainerClasses = [%s];\n""" % \
                (", ".join(["'%s'" % x for x in settings.toggle_container_classes]))

        outstr_config += """    jQuery.collective_navigationtoggle.listType = '%s';\n""" % settings.list_type
        outstr_config += """    jQuery.collective_navigationtoggle.listItem = '%s';\n""" % settings.list_item
        
        outstr_links = ""
        for selector in settings.selectors:
            outstr_links += self.JS_MODEL % selector.replace('"', '\\"') + '\n' 
        
        return self.JS_LITERAL % (outstr_config, outstr_links)

