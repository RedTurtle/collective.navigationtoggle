# -*- coding: utf-8 -*-

from zope.configuration import xmlconfig

from plone.testing import z2

from plone.app.testing import PLONE_FIXTURE
from plone.app.testing import PloneSandboxLayer
from plone.app.testing import IntegrationTesting
from plone.app.testing import quickInstallProduct
from plone.app.testing import setRoles
from plone.app.testing import TEST_USER_ID

class NavigationToggleLayer(PloneSandboxLayer):

    defaultBases = (PLONE_FIXTURE, )

    def setUpZope(self, app, configurationContext):
        # Load ZCML for this package
        import collective.navigationtoggle
        xmlconfig.file('configure.zcml',
                       collective.navigationtoggle,
                       context=configurationContext)
        z2.installProduct(app, 'collective.navigationtoggle')

    def setUpPloneSite(self, portal):
        #applyProfile(portal, 'collective.analyticspanel:default')
        quickInstallProduct(portal, 'collective.navigationtoggle')
        setRoles(portal, TEST_USER_ID, ['Member', 'Manager'])


NAVIGATION_TOGGLE_FIXTURE = NavigationToggleLayer()
NAVIGATION_TOGGLE_INTEGRATION_TESTING =  IntegrationTesting(bases=(NAVIGATION_TOGGLE_FIXTURE, ),
                                                            name="NavigationToggle:Integration")

