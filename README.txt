.. contents:: **Table of contents**

Documentation
=============

Target of this product is to make possible an expand/collapse feature in Plone navigation(s)
portlet without any modification to the navigation code itself, or any needs to override its features.

This product *is not* a new navigation portlet, is just a Javascript add-on that rely on native Plone's
`jQuery`__ support.

__ http://jquery.com/

When I will need this?
----------------------

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
The *NotImportantFolder* itself is not seen as a real content.

What will change
----------------

Make possible that special navigation links will no more move the user the the target section but simply
shows in the navigation itself all subsections (so the navigation seems like the user really moved to
the target folder).
A second click will collapse the section.
Default page in a folder and elements marked with "Exclude from navigation" are skipped.

The script try to simulate best at possible a normal portlet navigation behaviour.

The code keeps in mind *graceful degradation*. Browser without javascript enabled will simply use basic
Plone navigation features.

How to use
----------

Right now this is a product *targeted on developers*. You *must* provide a very simple Javascript
script to use and configure it.

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
at load page time (because for exampe we are still in the Plone root). However collective.navigationtoggle
perform the binding of expand/collapse action also for not-yet-loaded elements. 

Please, do not include the "/plonesiteid" part in your path or you will have problems when you put
Apache in front of Zope.

Whatever configuration you wrote, you **must** include you Javascript(s) file inside *portal_javascript*
tool *after* the *collective.navigationtoggle.js*.
Here an example of a Generic Setup import steps for your Javascript::

    <javascript cacheable="True"
             compression="safe"
             cookable="True"
             enabled="True"
             id="my-configuration-javascript-load-path.js"
             insert-after="++resource++collective.navigationtoggle.js"
             inline="False" />

Styles
------

This products dinamically adds two new possible CSS classes to <li> elements that contains links that match
the configuration.

Class "*cnavClosed*" is added when a special navigation elements is shown on the page and when you close
a subtree.
When a subsection is open, the class "*cnavOpen*" is added to the same element.

You can (but this product will don't) rely on those classes to give additional styles effects in your
Plone theme.

This products *may* also works on non-standard navigation HTML structure (as the generations on subelement
is done cloning existings node from the same navigation portlet) but some assumptions are done. 

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

* Give a Plone (or at least ZMI) UI for non-developer users, for TTW configuration
* Need more love for being more compatible with Plone 4 Sunburst Theme
* A clean uninstall GS step
* Make all this a jQuery plugin

Versions/Dependencies
=====================

Browsers
--------

* Firefox 3.6.3
* Google Chrome 5.0beta
* Opera 10.10
* Safari 4.0.5
* Internet Explorer 8.0

Plone
-----

* Plone 3.3
* Plone 4.0 (visual result with Sunburst Theme is not the best)

Dependencies
------------

* `simplejson`__ (if using Plone 3)
* jQuery 1.3 or better

__ http://pypi.python.org/pypi/simplejson

Other products
==============

If you need a complete expand/collapse navigation feature this product can be not enough; so take a
look to `collective.portlet.explore`__.

__ http://pypi.python.org/pypi/collective.portlet.explore

