Changelog
=========

1.0.3 (2020-05-05)
------------------

- added Transifex.net service integration to manage the translation process [macagua]
- added Spanish translation [macagua]
- updated gettext files support [macagua]

1.0.2 (2014-07-17)
------------------

- fixed a bug in @@query-subelements when using the product in a Plone site that's inside 
  another folder (filesystem, for example) [mpampols]
- fixed a bug that badly put rules inside the generated ``collective.navigationtoggle.rules.js``
  if they contains a quote char [keul]

1.0.1 (2013-01-24)
------------------

- use the object's id as the fallback title for expanded item
  (close `#6`__) [yangh]

  __ https://github.com/RedTurtle/collective.navigationtoggle/issues/6

1.0.0 (2013-01-15)
------------------

- fixed a bug when used with containers with spaces inside the id
  (close `#2`__) [keul]
- file icon of generated elements where not handled in the right way
  (close `#3`__) [keul]
- added a way to invalidate JS cache
  (close `#1`__) [keul]
- now general selectors can match also elements that are not <a>, but
  link's contents
  (close `#4`__) [keul]
- now checking the ``typesUseViewActionInListings`` configuration
  (close `#5`__) [keul]

  __ https://github.com/RedTurtle/collective.navigationtoggle/issues/2
  __ https://github.com/RedTurtle/collective.navigationtoggle/issues/3
  __ https://github.com/RedTurtle/collective.navigationtoggle/issues/1
  __ https://github.com/RedTurtle/collective.navigationtoggle/issues/4
  __ https://github.com/RedTurtle/collective.navigationtoggle/issues/5

0.4.0 (2012-11-15)
------------------

* added a product's browser layer
  [keul]
* provided an own configuration panel
  [keul]
* added all remaining configutation in Plone UI
  [keul]
* ``toggleContainerClass`` now is ``toggleContainerClasses``
  (can be used for a set of classes)
  [keul]
* added i18n support and italian translation
  [keul]
* changes AJAX calling context, now always calling portal root URL
  [keul]
* added tests (both Plone and JavaScript)
  [keul]

0.3.0 (2011-06-07)
------------------

* you can now use more general `jQuery selector`__ instead of simple URL path [keul]
* do not show types that are in list of unwanted types in navigation [keul]
* ``collective.navigationtoggle.txt`` was empty [keul]
* JSLint cleanup [keul]
* code is more general, and new properties likes ``toggleContainerClass``, ``listType``
  and ``listItem`` has been added.
  The code now can be used to simulate navigators also with not portlet navigator
  structures [keul]
* added the uninstall GS step [keul]
* fixed the `simplejson`__ dependency correctly, only if with Python < 2.6 [keul]
* links selectors can be added through Plone UI [keul]

__ http://docs.jquery.com/Selectors
__ http://pypi.python.org/pypi/simplejson

0.2.1 (2010-07-09)
------------------

* fixed a bug when fast double-click on opened elements (close `#1`__) [keul]
* much better Sunburst support (and other themes, in general), now checking also for "*contenttype-xx*"
  and "*state-xx*" CSS classes on links [keul]

__ http://plone.org/products/collective.navigationtoggle/issues/1

0.2.0 (2010-04-11)
------------------

* query_subelement view documentation was incomplete [keul]
* when querying empty folder, do not prevent (in facts: simulate) browser default action [keul]
* prevent browser cache (mainly know Internet Explorer problem) [keul]
* do not always display the content's image icon (sometimes users don't see them in navigation) [keul]
* now every element node cache its subtree, so AJAX call is performed only once (can be disabled) [keul]
* added dependency on simplejson for formatting server responses [keul]
* added minimal Plone 4.0 compatibility (UI result is not perfect) [keul]
* added a simple slide up/down effect (disabled by default) [keul]

0.1.0 (2010-04-06)
------------------

* initial release

