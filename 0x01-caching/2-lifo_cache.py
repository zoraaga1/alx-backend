#!/usr/bin/env python3
"""2-lifo_cache module"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """LIFOCache class that inherits from BaseCaching and is a caching system
    """

    def __init__(self):
        """Initiliaze
        """
        super().__init__()
        self.stack = []

    def put(self, key, item):
        """Add an item in the cache
        """
        if key and item:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                removed = self.stack.pop()
                del self.cache_data[removed]
                print("DISCARD: {}".format(removed))
            self.stack.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """Get an item by key
        """
        return self.cache_data.get(key) or None
