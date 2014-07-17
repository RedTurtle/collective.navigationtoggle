# -*- coding: utf-8 -*-

import unittest
from collective.navigationtoggle.interfaces import INavigationToggleLayer
from collective.navigationtoggle.interfaces import INavigationToggleSettings
from collective.navigationtoggle.testing import NAVIGATION_TOGGLE_INTEGRATION_TESTING
from plone.registry.interfaces import IRegistry
from zope import interface
from zope.component import getMultiAdapter, queryUtility


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
        self.settings.delay = 125
        self.assertTrue('jQuery.collective_navigationtoggle.slide_animation = 125;' in self.view())

    def test_cache(self):
        self.settings.client_cache = True
        self.assertTrue('jQuery.collective_navigationtoggle.cache = true;' in self.view())
        self.settings.client_cache = False
        self.assertTrue('jQuery.collective_navigationtoggle.cache = false;' in self.view())

    def test_listType(self):
        self.settings.list_type = 'dl'
        self.assertTrue("jQuery.collective_navigationtoggle.listType = 'dl';" in self.view())

    def test_listItem(self):
        self.settings.list_item = 'dd'
        self.assertTrue("jQuery.collective_navigationtoggle.listItem = 'dd';" in self.view())

    def test_toggleContainerClasses(self):
        self.settings.toggle_container_classes = (u'foo', )
        self.assertTrue("jQuery.collective_navigationtoggle.toggleContainerClasses = ['foo'];" in self.view())
        self.settings.toggle_container_classes = (u'foo', u'bar')
        self.assertTrue("jQuery.collective_navigationtoggle.toggleContainerClasses = ['foo', 'bar'];" in self.view())

    def test_toggle_elements(self):
        self.settings.selectors = (u'/foo', )
        self.assertTrue('jQuery.collective_navigationtoggle.toggle_elements.push("/foo");' in self.view())
        self.settings.selectors = (u'/foo', u'/bar')
        self.assertTrue('jQuery.collective_navigationtoggle.toggle_elements.push("/foo");' in self.view())
        self.assertTrue('jQuery.collective_navigationtoggle.toggle_elements.push("/bar");' in self.view())

    def test_toggle_elements_with_quoting(self):
        self.settings.selectors = (u'a[href="/aaa/bbb/ccc"]', )
        self.assertTrue('jQuery.collective_navigationtoggle.toggle_elements.push("a[href=\\"/aaa/bbb/ccc\\"]");' in self.view())
