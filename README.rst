.. contents:: **Table of contents**

Introduction
============

Scope of this product is to make possible an expand/collapse feature in Plone navigation(s)
portlet without any modification to the navigation code itself, or any needs to override its features.

This product *is not* a new navigation portlet, is just a JavaScript add-on that rely on native Plone's
`jQuery`__ support.

__ http://jquery.com/

More important: it is only focused to make *some* navigation links to be expandable. 

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

.. image:: http://blog.redturtle.it/pypi-images/collective.navigationtoggle/collective.navigationtoggle-0.3.0-01.png/image_mini
   :align: left
   :alt: Closed navigation from AUSL site
   :target: http://blog.redturtle.it/pypi-images/collective.navigationtoggle/collective.navigationtoggle-0.3.0-01.png

.. image:: http://blog.redturtle.it/pypi-images/collective.navigationtoggle/collective.navigationtoggle-0.3.0-02.png/image_mini
   :align: right
   :alt: Open navigation from AUSL site
   :target: http://blog.redturtle.it/pypi-images/collective.navigationtoggle/collective.navigationtoggle-0.3.0-02.png

Make possible that special navigation links will no more move the user to the target section but simply
shows in the navigation itself all subsections (so the navigation seems like the user really moved to
the target folder).

A second click will collapse the section.

Default page in a folder, elements marked with "*Exclude from navigation*" and unwanted
type from the ``metaTypesNotToList`` property will be excluded.

The script try to simulate best at possible a normal portlet navigation behavior.

The code keeps in mind *graceful degradation*. Browser without JavaScript enabled will simply use basic
Plone navigation features.

Detailed documentation
======================

Basic configuration
-------------------

In your Plone configuration panel you'll find the new "*Navigation Toggle settings*".

.. image:: http://blog.redturtle.it/pypi-images/collective.navigationtoggle/collective.navigationtoggle-0.4.0-01.png/image_preview
   :alt: Setup of Navigation Toggle configuration
   :target: http://blog.redturtle.it/pypi-images/collective.navigationtoggle/collective.navigationtoggle-0.4.0-01.png


From this section you can configure a lot of advanced options, mainly you need to configure:

**Link selectors**
    A set of URL path suffix like ``/foo1/foo2`` of an *href* attribute for a link.
    With this example a link like this will be *hit*::
    
        <a href="http://plonehost/plone/foo1/foo2">
    
    Commonly only link inside navigation portlet are checked (see the "*Toggle container classes*").
    
    You can also provide here a complex jQuery expression, for example::
    
        li.navTreeItem a
    
    If you don't directly provide a selector that match an HTML <A> element, you still need to query for something
    *inside* that kind of node, for example::
    
        li.navTreeItem a.contenttype-folder span
    
    In the last example above, only a click of the navigation entry text will trigger the expand/collapse features,
    while clicking on the icon will keep the default browser behavior.

**Animation delay**
    The product can enable for you a graphical effect when you expand/collapse items. This is disabled by
    default.

    To enable it you must change this value to something higher that 0. The value you put there is the time
    (in millisecond) used for the `slideDown`__ and `slideUp`__ jQuery's effect.

    __ http://api.jquery.com/slideDown/
    __ http://api.jquery.com/slideUp/

    Simply put it to 0 again (the default) to disable effect.

Advanced configurations
-----------------------

**Cache**
    Check it to perform client side cache of the AJAX request.
    If disabled a request to the server will be performed for every click on navigations.

**Toggle container classes**
    A set of CSS classes that mark you navigation elements.
    Only links inside elements with one of those classes are "toggleable".
    
    Note that this option is ignored for "Links selectors" entries where you used a jQuery
    expression and not a URL path.

**HTML list type**
    The type of HTML container element to looks for.

**HTML list item**
    The type of HTML item element to be generated.

Styles
------

This products dynamically adds two new possible CSS classes to ``<li>`` elements that contains links that match
the configuration.

Class "*cnavClosed*" is added when a special navigation elements is shown on the page and when you close
a subtree.
When a subsection is open, the class "*cnavOpen*" is added to the same element.

The generated substructure is a copy of the main structure given by Plone, but a "*cnavGenerated*" class is
added to it.

You can (but this product doesn't) rely on those classes to give additional styles effects in your
Plone theme.

Not standard navigation (...or portlet... or whatever you want)
---------------------------------------------------------------

This products *may* also works on non-standard navigation HTML structure (as the generations on subelement
is done cloning existing node from the same navigation portlet) but some assumptions are done.

As the code works almost client side, you can also use it in portlets that are not standard navigation.
Theoretically you can use it with something that is not even a portlet!

Versions/Dependencies
=====================

Browsers
--------

* Firefox 16 (...probably a new major version will be released while I'm typing this line...)
* Google Chrome 23 (...same as above...)
* Opera 12
* Safari 5.1
* Internet Explorer 8, 9

Plone
-----

* Plone 3.3 (classic Plone theme)
* Plone 4.2 (classic Plone theme and Sunburst)
* Plone 4.3 (classic Plone theme and Sunburst)

Dependencies
------------

* `simplejson`__ (if using Plone 3)
* jQuery 1.3 or better
* `plone.app.registry`__

__ http://pypi.python.org/pypi/simplejson
__ http://pypi.python.org/pypi/plone.app.registry

Cache controls
==============

Toggle configuration are stored in a JavaScript file that your browser and Plone *portal_javascript* tool
will probably cache.

When changing configuration you can use the "*Save and invalidate JS cache*" button.

Other products
==============

If you need a complete expand/collapse navigation feature this product is not for you; so take a
look at:

* `collective.portlet.explore`__
* `Solgema.NavigationPortlet`__

__ http://pypi.python.org/pypi/collective.portlet.explore
__ http://plone.org/products/solgema.navigationportlet

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

.. image:: https://www.redturtle.it/redturtle_banner.png
   :alt: RedTurtle Technology Site
   :target: http://www.redturtle.it/

Special thanks to Yang Hong for massive bug fixing.
