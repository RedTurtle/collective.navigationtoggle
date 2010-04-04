# -*- coding: utf-8 -*-

from Products.Five.browser import BrowserView
from Products.CMFCore.utils import getToolByName

class QuerySubelementsView(BrowserView):
    """Get a folder contents like structure of a Plone context
    
    This will generate a JSON data like this:
    
    {...}
    """
    
    def __call__(self, *args, **kwargs):
        request = self.request
        context = self.context
        request.response.setHeader('Content-Type','application/json')
        portal_url = getToolByName(context, 'portal_url')
        catalog = getToolByName(context, 'portal_catalog')
        portal = portal_url.getPortalObject()
        
        path = request.get('path', '')
        if not path:
            return ""
        path = path.replace(portal_url(), "")
        path = "/%s%s" % (portal.getId(), path)
        
        results = catalog(path={'query': path, 'depth': 1},
                          is_default_page=False,
                          sort_on='getObjPositionInParent')

        navElems = []
        for x in results:
            if not x.exclude_from_nav:
                navElems.append({'title': x.Title,
                                 'url': x.getURL(),
                                 'type': x.portal_type,
                                 'icon': "%s/%s" % (portal_url(), x.getIcon),
                                 'description': x.Description,
                                 })

        return repr(navElems)
