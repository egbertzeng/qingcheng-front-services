/*
 * This file is part of Flowplayer, http://flowplayer.org
 *
 *Copyright (c) 2008, 2009 Flowplayer Oy
 *
 * Released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

package static.qingchengkeji.libs.flowplayer - build.controls.src.actionscript.org.flowplayer.controls.button - build.controls.src.actionscript.org.flowplayer.controls.button static.libs.flowplayer - build.controls.src.actionscript.org.flowplayer.controls.button - build.controls.src.actionscript.org.flowplayer.controls.button - build.controls.src.actionscript.org.flowplayer.controls.button static.libs.flowplayer - build.controls.src.actionscript.org.flowplayer.controls.button static.flowplayer - build.controls.src.actionscript.org.flowplayer.controls.button {
	import org.flowplayer.view.AnimationEngine;	
	
	import flash.display.MovieClip;
	import flash.display.DisplayObject;
	import flash.display.DisplayObjectContainer;
	import flash.events.MouseEvent;
	
	import org.flowplayer.controls.config.Config;
	/**
	 * @author api
	 */
	public class AbstractToggleButton extends AbstractButton {

		protected var _upStateFace:DisplayObjectContainer;
		protected var _downStateFace:DisplayObjectContainer;

		public function AbstractToggleButton(config:Config, animationEngine:AnimationEngine) {
            super(config, animationEngine);
            _downStateFace = createDownStateFace();
			_upStateFace = createUpStateFace();
			addChild(_upStateFace);
		}

        override protected function resizeFace():void {
            resize(_downStateFace);
            resize(_upStateFace);
        }

        override protected function get faceWidth():Number {
            return _upStateFace.width;
        }

        override protected function get faceHeight():Number {
            return _upStateFace.height;
        }

        private function resize(disp:DisplayObject):void {
            disp.x = leftEdge;
            disp.y = topEdge;
            disp.height = height - topEdge - bottomEdge;
            disp.scaleX = disp.scaleY;
        }
//
//        override public function set scaleX(value:Number):void {
//            _upStateFace.scaleX = value;
//            _downStateFace.scaleX = value;
//        }
//
//        override public function set scaleY(value:Number):void {
//            _upStateFace.scaleY = value;
//            _downStateFace.scaleY = value;
//        }

		protected override function onMouseOut(event:MouseEvent = null):void {
//            if (event && isParent(event.relatedObject as DisplayObject, this)) return;
            resetDispColor(_upStateFace.getChildByName(HIGHLIGHT_INSTANCE_NAME));
            resetDispColor(_downStateFace.getChildByName(HIGHLIGHT_INSTANCE_NAME));
            hideTooltip();
            showMouseOutState(_upStateFace);
            showMouseOutState(_downStateFace);
        }

        protected override function onMouseOver(event:MouseEvent):void {
			transformDispColor(_upStateFace.getChildByName(HIGHLIGHT_INSTANCE_NAME));
			transformDispColor(_downStateFace.getChildByName(HIGHLIGHT_INSTANCE_NAME));
			showTooltip();
            showMouseOverState(_upStateFace);
            showMouseOverState(_downStateFace);
		}
		
		protected override function onMouseDown(event:MouseEvent):void {
			var overClip:DisplayObject = _upStateFace.getChildByName(HIGHLIGHT_INSTANCE_NAME);
			if ( overClip && overClip is MovieClip )
				MovieClip(overClip).gotoAndPlay("down");
				
			overClip = _downStateFace.getChildByName(HIGHLIGHT_INSTANCE_NAME);
			if ( overClip && overClip is MovieClip )
				MovieClip(overClip).gotoAndPlay("down");
		}
		
		public function get isDown():Boolean {
			return getChildByName(_downStateFace.name) != null;
		}

		public function set down(down:Boolean):void {
			if (isDown == down) return;
			removeChild(down ? _upStateFace : _downStateFace);
			addChild(down ? _downStateFace : _upStateFace);
		}

		protected function createUpStateFace():DisplayObjectContainer {
            return null;
		}

		protected function createDownStateFace():DisplayObjectContainer {
            return null;
		}
		
        override protected function createFace():DisplayObjectContainer {
            return null;
        }

	}
}
