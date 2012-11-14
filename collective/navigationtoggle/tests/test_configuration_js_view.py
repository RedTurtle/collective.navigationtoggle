# -*- coding: utf-8 -*-

try:
    # python2.6
    import json
except ImportError:
    # python2.4
    import simplejson as json

import unittest

from zope import interface
from zope.component import getMultiAdapter, queryUtility

from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID
from plone.app.testing import logout

from plone.registry.interfaces import IRegistry

from collective.navigationtoggle.interfaces import INavigationToggleLayer
from collective.navigationtoggle.interfaces import INavigationToggleSettings
from collective.navigationtoggle.testing import NAVIGATION_TOGGLE_INTEGRATION_TESTING

class TestConfigurationJSView(unittest.TestCase):

    layer = NAVIGATION_TOGGLE_INTEGRATION_TESTING

    def setUp(self):
        portal = self.layer['portal']
        request = self.layer['request']
        # to be removed when p.a.testing will fix https://dev.plone.org/ticket/11673
        interface.alsoProvides(request, INavigationToggleLayer)
        registry = queryUtility(IRegistry)
        self.settings = registry.forInterface(INavigationToggleSettings, check=False)
        self.view = getMultiAdapter((portal, request), name=u"collective.navigationtoggle.rules.js")

    def test_slide_animation(self):
        portal = self.layer['portal']
        request = self.layer['request']
        self.settings.delay = 125
        self.assertTrue('jQuery.collective_navigationtoggle.slide_animation = 125;' in self.view())

    def test_cache(self):
        portal = self.layer['portal']
        request = self.layer['request']
        self.settings.client_cache = True
        self.assertTrue('jQuery.collective_navigationtoggle.cache = true;' in self.view())
        self.settings.client_cache = False
        self.assertTrue('jQuery.collective_navigationtoggle.cache = false;' in self.view())

    def test_listType(self):
        portal = self.layer['portal']
        request = self.layer['request']
        self.settings.list_type = 'dl'
        self.assertTrue("jQuery.collective_navigationtoggle.listType = 'dl';" in self.view())

    def test_listItem(self):
        portal = self.layer['portal']
        request = self.layer['request']
        self.settings.list_item = 'dd'
        self.assertTrue("jQuery.collective_navigationtoggle.listItem = 'dd';" in self.view())

    def test_toggleContainerClasses(self):
        portal = self.layer['portal']
        request = self.layer['request']
        self.settings.toggle_container_classes = (u'foo', )
        self.assertTrue("jQuery.collective_navigationtoggle.toggleContainerClasses = ['foo'];" in self.view())
        self.settings.toggle_container_classes = (u'foo', u'bar')
        self.assertTrue("jQuery.collective_navigationtoggle.toggleContainerClasses = ['foo', 'bar'];" in self.view())

    def test_toggle_elements(self):
        portal = self.layer['portal']
        request = self.layer['request']
        self.settings.selectors = (u'/foo', )
        self.assertTrue('jQuery.collective_navigationtoggle.toggle_elements.push("/foo");' in self.view())
        self.settings.selectors = (u'/foo', u'/bar')
        self.assertTrue('jQuery.collective_navigationtoggle.toggle_elements.push("/foo");' in self.view())
        self.assertTrue('jQuery.collective_navigationtoggle.toggle_elements.push("/bar");' in self.view())


