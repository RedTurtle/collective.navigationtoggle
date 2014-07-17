# -*- coding: utf-8 -*-

from urllib import unquote

try:
    # python2.6
    import json
except ImportError:
    # python2.4
    import simplejson as json

from Products.Five.browser import BrowserView
from Products.CMFCore.utils import getToolByName

class QuerySubelementsView(BrowserView):
    """Get a folder contents like structure of a Plone context
    
    This will generate a JSON data in that format:
    
    {'title': title of the content,
     'url': URL of the content,
     'type': Portal type of the content,
     'icon': URL for the content icon,
     'description': Description of the content,
     }
    """
    
    def __call__(self, *args, **kwargs):
        request = self.request
        context = self.context
        response = request.response
        response.setHeader('Content-Type','application/json')
        response.addHeader("Cache-Control", "no-cache")
        response.addHeader("Pragma", "no-cache")
        portal_url = getToolByName(context, 'portal_url')
        catalog = getToolByName(context, 'portal_catalog')
        ptool = getToolByName(context, 'plone_utils')
        portal_properties = getToolByName(context, 'portal_properties')
        metaTypesNotToList = portal_properties.navtree_properties.metaTypesNotToList
        typesUseViewActionInListings = portal_properties.site_properties.typesUseViewActionInListings
        
        path = unquote(request.form.get('path', ''))
        if not path:
            return ""
        path = path.replace(portal_url(), "")
        path = "%s%s" % (portal_url.getPortalPath(), path)
        
        results = catalog(path={'query': path, 'depth': 1},
                          is_default_page=False,
                          sort_on='getObjPositionInParent')

        navElems = []
        for x in results:
            if not x.exclude_from_nav and x.portal_type not in metaTypesNotToList:
                navElems.append({'title': x.pretty_title_or_id(),
                                 'url': x.portal_type in typesUseViewActionInListings \
                                            and "%s/view" % x.getURL() or x.getURL(),
                                 'type': x.portal_type,
                                 'type_normalized': ptool.normalizeString(x.portal_type),
                                 'review_state_normalized': ptool.normalizeString(x.review_state),
                                 'icon': x.getIcon and "%s/%s" % (portal_url(), x.getIcon) or None,
                                 'description': x.Description,
                                 })
        return json.dumps(navElems)
