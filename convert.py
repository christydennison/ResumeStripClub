#!/usr/bin/env python
import sys
import os
import pdf2txt
import re

REDACTED_TEXT = 'REDACTED'
LINK_REGEX = re.compile('(https?:\/\/)?([a-zA-Z0-9]{2,4}\.)?(linkedin.com|lnkd\.in|github.com)\/.+')
EMAIL_REGEX = re.compile('([\w\.]+@(?:[\w]+\.)+[a-zA-Z]{2,})')

BLACKLIST_FILE = "bad_words.txt"

def get_blacklist_words():
    blacklist = []
    try:
        with open(BLACKLIST_FILE) as f:
            lines = f.read().splitlines()
        for line in lines:
            if line:
                blacklist.append(line.lower().strip())
    except Exception as e:
        print "Unable to read bad words from {0}. Error: {1}".format(BLACKLIST_FILE, e)
    return set(blacklist)

def join_newlines(array):
    return '\n'.join(array)

def redact_initial(file_lines, lastname):
    processed_file_lines = []
    fullname = ''
    firstname = ''

    for index, line in enumerate(file_lines):
        newline = line

        links = LINK_REGEX.search(newline.replace(" ", ""))
        if links:
            matching_text = links.group()
            # print 'links!', matching_text
            newline = newline.replace(" ", "").replace(matching_text, REDACTED_TEXT + ' PROFILE')
            # print newline

        emails = EMAIL_REGEX.search(newline.replace(" ", ""))
        if emails:
            matching_text = emails.group(1)
            # print 'emails!', matching_text
            newline = newline.replace(" ", "").replace(matching_text, REDACTED_TEXT + ' EMAIL')
            # print newline

        if lastname.lower() in newline.lower() or lastname.lower() in newline.lower().replace(" ", ""):
            fullname = newline.replace(" ", "")
            firstname = re.split(lastname, fullname, flags=re.IGNORECASE)[0]
            print fullname
            print firstname
            newline = newline.replace(" ", "").replace(firstname, firstname[0] + '. ')
            # print 'name',firstname
            # print newline
        processed_file_lines.append(newline)

    return processed_file_lines

def redact(list_of_lines):
    output = []
    blacklist = get_blacklist_words()
    for line in list_of_lines:
        newline = line
        for word in blacklist:
            to_replace = re.compile("[^\w]{0}[^\w]".format(word), re.IGNORECASE)
            newline = to_replace.sub(" {} ".format(REDACTED_TEXT), newline)
            # print newline

        output.append(newline)

    return output

def process(fname):
    lastname = '.'.join(os.path.basename(fname).split(".")[:-1])
    print 'Using name', lastname
    pathname = os.path.dirname(fname)
    file_path = os.path.join(pathname, lastname)
    txt_file_path = file_path + '.txt'
    redacted_file_path = file_path + '_redacted.txt'
    # os.remove(redacted_file_path)
    pdf2txt.main(['', '-o', txt_file_path, fname])

    with open(txt_file_path) as f:
        lines = f.read().splitlines()

    names_redacted = redact_initial(lines, lastname)
    output = redact(names_redacted)

    with open(redacted_file_path, 'w') as ofile:
        ofile.write(join_newlines(output))


if __name__ == "__main__":
    filenames = []
    if len(sys.argv) > 1:
        filenames = sys.argv[1:]
    else:
        print "You must give at least one file to process"
        sys.exit(1)

    for filename in filenames:
        process(filename)

