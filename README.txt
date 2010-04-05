Documentation
=============

The target of this product is to make possible an expand/collapse feature in Plone navigation(s)
portlet without any modification to the navigation code itself, or any needs to override its features.

This product *is not* a new navigation portlet, is just a Javascript add-on that rely on native Plone's
`jQuery`__ support.

__ http://jquery.com/

When I will need this?
----------------------

The collective.navigationtoggle is useful when your Plone site needs (not much) special handling of
navigation elements. Sometimes your site structure is done like this::

    ROOT
    |
    |_ Folder
    \_ NotImportantFolder
       |
       |_ ImportantFolder1
       ...
       \_ ImportantFolderN

If you configure your navigation portlet on the site root, users must click on the *NotImportantFolder*
and reload the whole page to reach the *ImportantFolder*'s section.
The site at the *NotImportantFolder* level is not useful... maybe you only give a *folder_listing* view
or a default page that only say "Welcome to an important area of the site, please visit... bla bla bla".

For the user experience the first click is only a waste of time.

How to use
----------

Right now this is a product *targeted on developers*. You *must* provide a very simple Javascript
script to use and configure it.



Other products
==============

If you need a complete expand/collapse navigation feature this product can be not enough; so take a
look to `collective.portlet.explore`__.

__ http://pypi.python.org/pypi/collective.portlet.explore

