import pywikibot

# Connect to the site
site = pywikibot.Site()
site.login()

# Target a page
page = pywikibot.Page(site, 'Main Page')

# Read it
print(f"Successfully connected! The Main Page has {len(page.text)} characters.")