from setuptools import setup, find_packages
import os

version = '0.2.0'

setup(name='collective.navigationtoggle',
      version=version,
      description=("Make possible to expand/collapse specific Plone "
                   "navigation entries in a very unobtrusive way"),
      long_description=open("README.txt").read() + "\n" +
                       open(os.path.join("docs", "HISTORY.txt")).read(),
      # Get more strings from
      # http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Framework :: Plone",
        "Intended Audience :: Developers",
        "Programming Language :: Python",
        "Programming Language :: JavaScript",
        "Development Status :: 4 - Beta",
        ],
      keywords='plone jquery navigation javascript',
      author='RedTurtle Technology',
      author_email='sviluppoplone@redturtle.net',
      url='http://plone.org/products/collective.navigationtoggle',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['collective'],
      include_package_data=True,
      zip_safe=False,
      install_requires=[
          'setuptools',
          #'Plone',
          'simplejson',
      ],
      entry_points="""
      [z3c.autoinclude.plugin]
      target = plone
      """,
      setup_requires=["PasteScript"],
      paster_plugins=["ZopeSkel"],
      )
