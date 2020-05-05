# -*- coding: utf-8 -*-

from setuptools import setup, find_packages
import os
import sys

version = '1.0.3'

install_requires = ['setuptools',
                    'Plone',
                    'zope.component',
                    'zope.annotation',
                    'plone.app.registry']

if sys.version_info < (2, 6):
    install_requires.append('simplejson')

tests_require=['plone.app.testing', ]

setup(name='collective.navigationtoggle',
      version=version,
      description=("Expand/collapse feature for specific Plone "
                   "navigation entries, in an unobtrusive way"),
      long_description=open("README.rst").read() + "\n" +
                       open(os.path.join("docs", "HISTORY.rst")).read(),
      # Get more strings from
      # http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Framework :: Plone",
        "Framework :: Plone :: 3.3",
        "Framework :: Plone :: 4.0",
        "Framework :: Plone :: 4.1",
        "Framework :: Plone :: 4.2",
        "Framework :: Plone :: 4.3",
        "Programming Language :: Python",
        "Programming Language :: JavaScript",
        "Development Status :: 5 - Production/Stable",
        ],
      keywords='plone plonegov jquery navigation javascript',
      author='RedTurtle Technology',
      author_email='sviluppoplone@redturtle.it',
      url='http://plone.org/products/collective.navigationtoggle',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['collective'],
      include_package_data=True,
      zip_safe=False,
      tests_require=tests_require,
      extras_require=dict(test=tests_require),
      install_requires=install_requires,
      entry_points="""
      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
