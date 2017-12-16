/*
 * This file is part of Flowplayer, http://flowplayer.org
 *
 * By: Anssi Piirainen, <support@flowplayer.org>
 * Copyright (c) 2008, 2009 Flowplayer Oy
 *
 * Released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

package static.qingchengkeji.libs.flowplayer - build.controls.src.actionscript.org.flowplayer.controls.config - build.controls.src.actionscript.org.flowplayer.controls.config static.libs.flowplayer - build.controls.src.actionscript.org.flowplayer.controls.config - build.controls.src.actionscript.org.flowplayer.controls.config - build.controls.src.actionscript.org.flowplayer.controls.config static.libs.flowplayer - build.controls.src.actionscript.org.flowplayer.controls.config static.flowplayer - build.controls.src.actionscript.org.flowplayer.controls.config {
    import org.flowplayer.controls.config.WidgetBooleanStates;

    public class WidgetEnabledStates extends WidgetBooleanStates{

        [Value]
        override public function get stop():Boolean {
            return value("stop", true);
        }

        [Value]
        override public function get playlist():Boolean {
            return value("playlist", true);
        }
   }
}