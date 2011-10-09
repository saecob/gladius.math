################################################################################
# NOTES:
#
# This Makefile assumes that you have the following installed, setup:
#
#  * node: http://nodejs.org
#  * Unixy shell (use msys on Windows)
#
################################################################################

MATH := math
SRC_DIR := ./src
TEST_DIR := ./test
DIST_DIR := ./dist
EXTERNAL_DIR := ./external
MATH_SRC := $(SRC_DIR)/$(MATH).js
MATH_DIST := $(DIST_DIR)/$(MATH).js
MATH_MIN := $(DIST_DIR)/$(MATH).min.js
TOOLS_DIR := ./tools
DIST_TEST_DIR := $(DIST_DIR)/test
DIST_TOOLS_DIR := $(DIST_DIR)/tools

CORE_FILES := $(SRC_DIR)/math.js $(wildcard $(TEST_DIR)/*.js)

jshint = echo "Linting $(1)" ; node $(TOOLS_DIR)/jshint-cmdline.js $(1)

compile = node $(TOOLS_DIR)/node_modules/uglify-js/bin/uglifyjs -o $(1) $(MATH_DIST)

complete = cat $(MATH_MIN) > $(1)

jshint = echo "Linting $(1)" ; node $(TOOLS_DIR)/jshint-cmdline.js $(1)

all: $(DIST_DIR) $(MATH_DIST) $(MATH_MIN)
	@@echo "Finished, see $(DIST_DIR)"

$(DIST_DIR):
	@@echo "Creating $(DIST_DIR)"
	@@mkdir $(DIST_DIR)

$(MATH_DIST): $(DIST_DIR) $(MATH_SRC) $(CUBICVR_LIB)
	@@echo "Building $(MATH_DIST)"
	@@cd $(TOOLS_DIR) && node r.js -o build.js

$(MATH_MIN): $(DIST_DIR) $(MATH_SRC)
	@@echo "Building $(MATH_MIN)"
	@@$(call compile,$(MATH_MIN))

test: $(DIST_DIR) $(MATH_MIN)
	@@echo "Creating tests in $(DIST_TEST_DIR)"
	@@mv $(MATH_MIN) $(MATH_DIST)
	@@cp -R $(TEST_DIR) $(DIST_DIR)
	@@mv $(DIST_TEST_DIR)/index.html.dist $(DIST_TEST_DIR)/index.html
	@@mkdir -p $(DIST_TOOLS_DIR)/qunit
	@@cp -R $(TOOLS_DIR)/qunit/qunit $(DIST_TOOLS_DIR)/qunit
	@@echo "Starting web server in $(DIST_DIR), browse to http://localhost:9914/ (ctrl+c to stop)..."
	@@cd $(DIST_DIR) && python ../$(TOOLS_DIR)/test_server.py

clean:
	@@rm -fr $(DIST_DIR)

check-lint: check-lint-all

check-lint-all:
	@@$(foreach corefile,$(CORE_FILES),echo "-----" ; $(call jshint,$(corefile)) ; )

submodule:
	@@git submodule update --init --recursive
	@@git submodule status --recursive
