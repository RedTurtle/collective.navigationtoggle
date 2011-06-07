from setuptools import setup, find_packages
import os

version = '0.3.0dev'

install_requires = ['setuptools', 'Plone']
if sys.version_info < (2, 6):
    install_requires.append('simplejson')

setup(name='collective.navigationtoggle',
      version=version,
      description=("Expand/collapse feature for specific Plone "
                   "navigation entries, in an unobtrusive way"),
      long_description=open("README.txt").read() + "\n" +
                       open(os.path.join("docs", "HISTORY.txt")).read(),
      # Get more strings from
      # http://pypi.python.org/pypi?%3Aaction=list_classifiers
      classifiers=[
        "Framework :: Plone",
        "Intended Audience :: Developers",
        "Programming Language :: Python",
        "Programming Language :: JavaScript",
        "Development Status :: 5 - Production/Stable",
        ],
      keywords='plone plonegov jquery navigation javascript',
      author='RedTurtle Technology',
      author_email='sviluppoplone@redturtle.net',
      url='http://plone.org/products/collective.navigationtoggle',
      license='GPL',
      packages=find_packages(exclude=['ez_setup']),
      namespace_packages=['collective'],
      include_package_data=True,
      zip_safe=False,
      install_requires=install_requires,
      entry_points="""
      [z3c.autoinclude.plugin]
      target = plone
      """,
      )
