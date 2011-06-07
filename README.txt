.. contents:: **Table of contents**

Introduction
============

Scope of this product is to make possible an expand/collapse feature in Plone navigation(s)
portlet without any modification to the navigation code itself, or any needs to override its features.

This product *is not* a new navigation portlet, is just a Javascript add-on that rely on native Plone's
`jQuery`__ support.

__ http://jquery.com/

When you will like this?
------------------------

The collective.navigationtoggle is useful when your Plone site needs (not much) special handling of
navigation elements. Sometimes your site structure is someway like this::

    ROOT
    |
    |_ FolderWhatever
    \_ NotImportantFolder
       |
       |_ ImportantFolder1
       ...
       \_ ImportantFolderN

If you configure your navigation portlet on the site root, users must click on the *NotImportantFolder*
and reload the whole page to reach the *ImportantFolder*'s section.
The site at the *NotImportantFolder* level is not useful... maybe you only give a *folder_listing* view
or a default page that only say "Welcome to an important area of the site, please visit the subsection
you are looking for...".

For the user experience the first click is only a waste of time.

What you are looking for can be a client side effect that expand/collapse the folder in the navigation.
The *NotImportantFolder* itself is not seen as a real content in your information architecture.

What will change
----------------

.. image:: http://keul.it/images/plone/collective.navigationtoggle-0.3.0-01.png
   :alt: Closed navigation from AUSL site

Make possible that special navigation links will no more move the user to the target section but simply
shows in the navigation itself all subsections (so the navigation seems like the user really moved to
the target folder).

.. image:: http://keul.it/images/plone/collective.navigationtoggle-0.3.0-02.png
   :alt: Open navigation from AUSL site

A second click will collapse the section.

Default page in a folder, elements marked with "Exclude from navigation" and unwanted
type from the ``metaTypesNotToList`` property will be excluded.

The script try to simulate best at possible a normal portlet navigation behaviour.

The code keeps in mind *graceful degradation*. Browser without JavaScript enabled will simply use basic
Plone navigation features.

Detailed documentation
======================

Basic configuration
-------------------

Use the *Plone registry* to configure which navigation links will be expanded.

.. image:: http://keul.it/images/plone/collective.navigationtoggle-0.3.0-03.png
   :alt: Setup URL path or jQuery selectors

Just privide a list of elements, where every element can be:

* existing suffix of an *href* attribute for a link (like "/folder/foo")
* a valid jQuery selector

See next section for more technical informations.

Manually configuration for your themes
--------------------------------------

If you don't want to use the Plone UI, you can add additional configuration manually;
you can provide a very simple Javascript script to use and configure it.

You must add additional Javascript source(s) like this::

    jQuery.collective_navigationtoggle.toggle_elements.push("/foo1/foo2");

Where "*/foo1/foo2*" can be an existing suffix of an *href* attribute for a link. Only link inside
navigation portlet are checked (looking for "*portletNavigationTree*" class).

So, a link like this (*if* inside a navigation portlet) is "hit" and magically handled::

    <a href="http://plonehost/foo/foo1/foo2">

This because the *href* ends with one of the elements found inside *toggle_elements*.

Another possible configuration::

    jQuery.collective_navigationtoggle.toggle_elements.push("/foo1/foo2");
    jQuery.collective_navigationtoggle.toggle_elements.push("/foo1/foo2/foo3");

This time the "*foo3*" folder is inside the "*foo2*" and can be possible that the last link is not available
at load page time (because for example we are still in the Plone root). However collective.navigationtoggle
perform the binding of expand/collapse action also for not-yet-loaded elements. 

Please, do not include the "/plonesiteid" part in your path or you will have problems when you put
Apache in front of Zope.

Instead of giving the link URL path, you can also provide a jQuery selector expression::

    jQuery.collective_navigationtoggle.toggle_elements.push(".portletNavigationTree a.markedLink");

Be aware that, with this kins of configuration, the "*portletNavigationTree*" search filter is not included
(if you want it, you must provide it yourself).

Whatever configuration you wrote, you **must** include you JavaScript(s) file inside *portal_javascript*
tool *after* the *collective.navigationtoggle.js*.
Here an example of a Generic Setup import steps for your JavaScript::

    <javascript cacheable="True"
             compression="safe"
             cookable="True"
             enabled="True"
             id="my-configuration-javascript-load-path.js"
             insert-after="++resource++collective.navigationtoggle.js"
             inline="False" />

Styles
------

This products dinamically adds two new possible CSS classes to ``<li>`` elements that contains links that match
the configuration.

Class "*cnavClosed*" is added when a special navigation elements is shown on the page and when you close
a subtree.
When a subsection is open, the class "*cnavOpen*" is added to the same element.

The generated substructure is a copy of the main strucutre given by Plone, but a "*cnavGenerated*" class is
added to it.

You can (but this product doesn't) rely on those classes to give additional styles effects in your
Plone theme.

Not standard navigation (...or portlet... or whatever you want)
---------------------------------------------------------------

This products *may* also works on non-standard navigation HTML structure (as the generations on subelement
is done cloning existings node from the same navigation portlet) but some assumptions are done.

As the code works almost client side, you can also use it in portlets that are not standard navigation.
Theoretically you can use it with something that is not even a portlet!

Whay you need is to change those configuration parameter:

 ``toggleContainerClass``
     The class that the navigation structure must provide. Only used if you check for link URL path.
     You can also null this.

     Default is *portletNavigationTree*.

 ``listType``
     The HTML element structure that the link must be contained into. This is important as is taken
     and cloned when the link is expanded.
     
     Default is *ul*

  ``listItem``
      As above, but this is the HTML list item that will be checked and used.
      
      Default is *li*

For example, you can write::

	jQuery.collective_navigationtoggle.toggleContainerClass = 'portletCollection';
	jQuery.collective_navigationtoggle.listType = 'dl';
	jQuery.collective_navigationtoggle.listItem = 'dt';
	jQuery.collective_navigationtoggle.toggle_elements.push("/my/path");

Effects
-------

The product can enable for you a graphical effect when you expand/collapse items. This is disabled by
default.

To enable it you must change another plugin var::

    jQuery.collective_navigationtoggle.slide_animation = 300;

The value you put there is the time (in millisec) used for the `slideDown`__ and `slideUp`__ jQuery's
effect.

__ http://api.jquery.com/slideDown/
__ http://api.jquery.com/slideUp/

Simply put it to 0 again (the default) to disable effect.

TODO
====

* Internationalization
* Change global configuration settings to be different for every navigation
* More configuration from Plone UI 

Versions/Dependencies
=====================

Browsers
--------

* Firefox 3.6
* Google Chrome 5
* Opera 10
* Safari 5
* Internet Explorer 8

Plone
-----

* Plone 3.3 (classic Plone theme)
* Plone 4.0 (classic Plone theme and Sunburst)

Dependencies
------------

* `simplejson`__ (if using Plone 3)
* jQuery 1.3 or better
* `plone.app.registry`__

__ http://pypi.python.org/pypi/simplejson
__ http://pypi.python.org/pypi/plone.app.registry

Other products
==============

If you need a complete expand/collapse navigation feature this product is not for you; so take a
look to `collective.portlet.explore`__.

__ http://pypi.python.org/pypi/collective.portlet.explore

Credits
=======

Developed with the support of:

* `S. Anna Hospital, Ferrara`__
  
  .. image:: http://www.ospfe.it/ospfe-logo.jpg 
     :alt: S. Anna Hospital logo

* `Azienda USL Ferrara`__

  .. image:: http://www.ausl.fe.it/logo_ausl.gif
     :alt: Azienda USL logo

All of them supports the `PloneGov initiative`__.

__ http://www.ospfe.it/
__ http://www.ausl.fe.it/
__ http://www.plonegov.it/

Authors
=======

This product was developed by RedTurtle Technology team.

.. image:: http://www.redturtle.net/redturtle_banner.png
   :alt: RedTurtle Technology Site
   :target: http://www.redturtle.net/

